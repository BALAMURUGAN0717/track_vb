import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Eye,
  Key,
  Info,
  X,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function FaceVerificationModal({ isOpen, onClose, onSuccess, isLoginMode = false }) {
  const navigate = useNavigate();
  const { verifyFaceSuccess, isFaceLockEnabled } = useAuth();

  // Camera & Detection States
  const [stream, setStream] = useState(null);
  const [cameraState, setCameraState] = useState('prompt'); // 'prompt' | 'requesting' | 'active' | 'denied' | 'unavailable'
  const [isSimulated, setIsSimulated] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [alignmentStatus, setAlignmentStatus] = useState('Position your face inside the circle');
  const [scanProgress, setScanProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState(null); // null | 'success' | 'failed'
  const [errorMessage, setErrorMessage] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Request real camera stream
  const startCamera = async () => {
    setCameraState('requesting');
    setErrorMessage('');
    setVerificationResult(null);
    setScanProgress(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      setStream(mediaStream);
      setCameraState('active');
      setIsSimulated(false);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((e) => console.warn('Video play error:', e));
      }
    } catch (err) {
      console.warn('Camera access issue:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraState('denied');
        setErrorMessage('Camera access was denied. Please allow camera permissions in your browser or switch to Demo Simulation.');
      } else {
        setCameraState('unavailable');
        setErrorMessage('No camera found or device is busy. You can use the built-in Simulated Face Demo.');
      }
    }
  };

  // Fallback Demo Simulation (works 100% on any device)
  const startSimulation = () => {
    stopCameraStream();
    setIsSimulated(true);
    setCameraState('active');
    setErrorMessage('');
    setVerificationResult(null);
    setScanProgress(0);
    setAlignmentStatus('Simulated biometric stream initialized. Centering face target...');
  };

  // Stop camera helper
  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
  };

  // Clean up on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopCameraStream();
      setCameraState('prompt');
      setVerificationResult(null);
      setScanProgress(0);
    }
    return () => {
      stopCameraStream();
    };
  }, [isOpen]);

  // Video Frame Analysis & Face Detection Loop
  useEffect(() => {
    if (cameraState !== 'active') return;

    let active = true;

    // Check if browser native FaceDetector is supported
    const hasNativeFaceDetector = typeof window !== 'undefined' && 'FaceDetector' in window;
    let detector = null;
    if (hasNativeFaceDetector) {
      try {
        // @ts-ignore
        detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
      } catch (e) {
        detector = null;
      }
    }

    const detectLoop = async () => {
      if (!active) return;

      if (isSimulated) {
        // High quality simulated face detection
        setFaceDetected(true);
        setAlignmentStatus('Face centered perfectly. Ready to scan.');
      } else if (videoRef.current && videoRef.current.readyState === 4) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (canvas) {
          const ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth || 320;
          canvas.height = video.videoHeight || 240;

          if (detector) {
            try {
              const faces = await detector.detect(video);
              if (faces.length > 0) {
                setFaceDetected(true);
                setAlignmentStatus('Face recognized! Hold still for biometric scan.');
              } else {
                setFaceDetected(false);
                setAlignmentStatus('No face detected. Center your face in the oval frame.');
              }
            } catch {
              // fallback to luminosity & movement heuristic
              analyzeCanvasPresence(ctx, video, canvas);
            }
          } else {
            // Robust Canvas pixel heuristic
            analyzeCanvasPresence(ctx, video, canvas);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    };

    const analyzeCanvasPresence = (ctx, video, canvas) => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Sample central oval region
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const w = canvas.width * 0.4;
      const h = canvas.height * 0.5;

      try {
        const frameData = ctx.getImageData(cx - w / 2, cy - h / 2, w, h);
        let totalBrightness = 0;
        const data = frameData.data;
        for (let i = 0; i < data.length; i += 16) {
          totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        const avgBrightness = totalBrightness / (data.length / 16);

        // If adequate lighting is present in frame
        if (avgBrightness > 30 && avgBrightness < 240) {
          setFaceDetected(true);
          setAlignmentStatus('Face aligned. Hold steady for scan...');
        } else {
          setFaceDetected(false);
          setAlignmentStatus('Lighting too dim or uneven. Please face a light source.');
        }
      } catch (e) {
        setFaceDetected(true);
        setAlignmentStatus('Face aligned in biometric target.');
      }
    };

    detectLoop();

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cameraState, isSimulated]);

  // Run Biometric Scan Demonstration
  const triggerScan = () => {
    if (!faceDetected && !isSimulated) {
      setErrorMessage('Please align your face inside the biometric frame first.');
      return;
    }

    setVerificationResult(null);
    setScanProgress(0);
    setErrorMessage('');
    setAlignmentStatus('Scanning facial geometry and biometric vectors...');

    let current = 0;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(() => {
      current += 5;
      setScanProgress(current);

      if (current >= 100) {
        clearInterval(scanIntervalRef.current);
        // Successful verification demonstration
        setVerificationResult('success');
        setAlignmentStatus('Identity confirmed! Biometric verification match 99.4% (Demo).');

        verifyFaceSuccess();

        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            onClose();
            navigate('/dashboard');
          }
        }, 1200);
      }
    }, 80);
  };

  // Re-verify action
  const handleRetry = () => {
    setVerificationResult(null);
    setScanProgress(0);
    setErrorMessage('');
    if (!isSimulated) {
      startCamera();
    } else {
      startSimulation();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(5, 8, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#0B1020',
          borderRadius: '24px',
          border: '1px solid rgba(79, 140, 255, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(79, 140, 255, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Futuristic Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #1A243D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, #0F162A 0%, #151D32 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(79, 140, 255, 0.5)'
              }}
            >
              <Eye size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Face Lock Biometric Scanner
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#38BDF8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Frontend Camera Verification (Demo)
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              stopCameraStream();
              onClose();
            }}
            style={{
              color: '#A0AEC0',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Camera / Biometric Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            background: '#070A14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Active Camera View */}
          {cameraState === 'active' && !isSimulated && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)' // mirror
              }}
            />
          )}

          {/* Simulated Mode View (Realistic futuristic 3D avatar wireframe) */}
          {cameraState === 'active' && isSimulated && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, #151D32 0%, #070A14 80%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Simulated Face Silhouette */}
              <div
                style={{
                  width: '140px',
                  height: '180px',
                  borderRadius: '50% 50% 45% 45%',
                  border: '2px dashed rgba(56, 189, 248, 0.6)',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Eyes reticle */}
                <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
                </div>
                <div style={{ width: '28px', height: '4px', background: 'rgba(56, 189, 248, 0.8)', borderRadius: '2px' }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '14px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid #38BDF8',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#38BDF8'
                }}
              >
                ● SIMULATION LIVE
              </div>
            </div>
          )}

          {/* Hidden Canvas for Frame Processing */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Biometric Scanning Reticle & Overlay */}
          {cameraState === 'active' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Central Oval Frame */}
              <div
                style={{
                  width: '210px',
                  height: '260px',
                  borderRadius: '50% 50% 45% 45%',
                  border: `2px solid ${
                    verificationResult === 'success'
                      ? '#10B981'
                      : faceDetected
                      ? '#4F8CFF'
                      : 'rgba(239, 68, 68, 0.8)'
                  }`,
                  boxShadow: `0 0 30px ${
                    verificationResult === 'success'
                      ? 'rgba(16, 185, 129, 0.4)'
                      : faceDetected
                      ? 'rgba(79, 140, 255, 0.4)'
                      : 'rgba(239, 68, 68, 0.3)'
                  }`,
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Reticle Corner Brackets */}
                <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '20px', height: '20px', borderTop: '3px solid #38BDF8', borderLeft: '3px solid #38BDF8' }} />
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', borderTop: '3px solid #38BDF8', borderRight: '3px solid #38BDF8' }} />
                <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '20px', height: '20px', borderBottom: '3px solid #38BDF8', borderLeft: '3px solid #38BDF8' }} />
                <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '20px', height: '20px', borderBottom: '3px solid #38BDF8', borderRight: '3px solid #38BDF8' }} />

                {/* Animated Horizontal Scan Laser */}
                {scanProgress > 0 && scanProgress < 100 && (
                  <motion.div
                    animate={{ top: ['0%', '98%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      left: '0',
                      right: '0',
                      height: '2.5px',
                      background: 'linear-gradient(90deg, transparent, #38BDF8, #8B5CF6, transparent)',
                      boxShadow: '0 0 15px #38BDF8, 0 0 30px #8B5CF6'
                    }}
                  />
                )}
              </div>

              {/* HUD Coordinates & Telemetry */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#38BDF8',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                FPS: 60 | VEC: [32, 128] | MESH: ACTIVE
              </div>
            </div>
          )}

          {/* Initial Prompt State */}
          {cameraState === 'prompt' && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(79, 140, 255, 0.15)',
                  border: '1px solid rgba(79, 140, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4F8CFF'
                }}
              >
                <Camera size={28} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700' }}>
                  Camera Permission Required
                </h4>
                <p style={{ color: '#A0AEC0', fontSize: '0.8rem', maxWidth: '340px', marginTop: '4px' }}>
                  To demonstrate the Face Lock verification feature, please grant explicit camera access.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button onClick={startCamera} className="btn btn-primary btn-sm">
                  <Camera size={14} /> Allow Camera & Start
                </button>
                <button onClick={startSimulation} className="btn btn-secondary btn-sm" style={{ color: '#38BDF8' }}>
                  <Play size={14} /> Demo Simulation
                </button>
              </div>
            </div>
          )}

          {/* Requesting State */}
          {cameraState === 'requesting' && (
            <div style={{ textAlign: 'center', color: '#38BDF8' }}>
              <RefreshCw size={36} className="animate-spin" style={{ animationDuration: '1s' }} />
              <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>Waiting for camera permissions...</p>
            </div>
          )}

          {/* Denied / Unavailable States */}
          {(cameraState === 'denied' || cameraState === 'unavailable') && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444'
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700' }}>
                Camera Unavailable
              </h4>
              <p style={{ color: '#A0AEC0', fontSize: '0.8rem', maxWidth: '360px' }}>
                {errorMessage}
              </p>
              <button
                onClick={startSimulation}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '8px' }}
              >
                <Play size={14} /> Switch to Simulated Face Demo
              </button>
            </div>
          )}
        </div>

        {/* Live Alignment & Status Feedback */}
        <div
          style={{
            padding: '16px 24px',
            background: '#0E1528',
            borderTop: '1px solid #1A243D',
            borderBottom: '1px solid #1A243D'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.825rem',
                fontWeight: '600',
                color: verificationResult === 'success' ? '#10B981' : faceDetected ? '#38BDF8' : '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {verificationResult === 'success' ? (
                <CheckCircle2 size={16} />
              ) : faceDetected ? (
                <ShieldCheck size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
              {alignmentStatus}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#A0AEC0' }}>
              {scanProgress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: '#151D32',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: '3px',
                background:
                  verificationResult === 'success'
                    ? 'linear-gradient(90deg, #10B981, #059669)'
                    : 'linear-gradient(90deg, #4F8CFF, #8B5CF6)'
              }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div
          style={{
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {cameraState === 'active' && (
              <button
                onClick={handleRetry}
                className="btn btn-secondary btn-sm"
                style={{ color: '#A0AEC0', border: '1px solid #29344D' }}
              >
                <RefreshCw size={13} /> Re-verify
              </button>
            )}
            {!isSimulated && cameraState === 'active' && (
              <button
                onClick={startSimulation}
                className="btn btn-secondary btn-sm"
                style={{ color: '#38BDF8', border: '1px solid #29344D' }}
              >
                Simulate Demo
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                stopCameraStream();
                onClose();
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: '#A0AEC0', border: '1px solid #29344D' }}
            >
              Cancel
            </button>

            {cameraState === 'active' && verificationResult !== 'success' && (
              <button
                onClick={triggerScan}
                disabled={scanProgress > 0 && scanProgress < 100}
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.875rem' }}
              >
                {scanProgress > 0 ? 'Scanning...' : 'Verify Face (Demo)'}
              </button>
            )}

            {verificationResult === 'success' && (
              <button
                onClick={() => {
                  stopCameraStream();
                  if (onSuccess) onSuccess();
                  else {
                    onClose();
                    navigate('/dashboard');
                  }
                }}
                className="btn"
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  padding: '8px 20px',
                  fontSize: '0.875rem'
                }}
              >
                Access Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Security & Privacy Transparency Box */}
        <div
          style={{
            padding: '12px 24px',
            background: 'rgba(15, 22, 42, 0.8)',
            borderTop: '1px solid #1A243D',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '0.72rem',
            color: '#64748B',
            lineHeight: 1.45
          }}
        >
          <Info size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#4F8CFF' }} />
          <span>
            <strong style={{ color: '#A0AEC0' }}>Security Disclosure:</strong> This is a client-side
            demonstration. Raw camera frames and biometric face templates are <em>never</em> stored or
            transmitted. True identity authentication requires a secure backend with WebAuthn/FIDO2 challenges.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
