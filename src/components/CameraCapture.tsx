
import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const CameraCapture = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageCapture, setImageCapture] = useState<string | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const [fishData, setFishData] = useState<{ name: string; confidence: number } | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  
  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Show fallback UI
      setCameraActive(false);
    }
  };
  
  // Take picture
  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      
      // Set canvas dimensions to match video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      // Draw the video frame to the canvas
      context?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      
      // Convert canvas to data URL
      const imageDataUrl = canvasRef.current.toDataURL('image/png');
      setImageCapture(imageDataUrl);
      
      // Stop the camera stream
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      
      // Reset video source
      videoRef.current.srcObject = null;
      setCameraActive(false);
      
      // Mock fish recognition
      recognizeFish(imageDataUrl);
    }
  };
  
  // Mock fish recognition function
  const recognizeFish = (imageData: string) => {
    setRecognizing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setRecognizing(false);
      setFishData({
        name: 'Rainbow Trout',
        confidence: 0.94
      });
    }, 2000);
  };
  
  // Reset the camera
  const resetCamera = () => {
    setImageCapture(null);
    setFishData(null);
    startCamera();
  };

  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center">
        {!cameraActive && !imageCapture && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="h-16 w-16 rounded-full bg-fischer-blue/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-fischer-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <Button onClick={startCamera}>{t('camera')}</Button>
          </div>
        )}
        
        {cameraActive && (
          <div className="relative w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md"
            />
            <div className="absolute inset-0 border-2 border-dashed border-fischer-blue/50 pointer-events-none rounded-md" />
          </div>
        )}
        
        {imageCapture && (
          <div className="w-full">
            <img
              src={imageCapture}
              alt="Captured fish"
              className="w-full rounded-md"
            />
          </div>
        )}
        
        {fishData && (
          <div className="mt-4 p-4 bg-fischer-blue/10 rounded-lg w-full">
            <div className="text-center">
              <div className="font-bold text-lg">{fishData.name}</div>
              <div className="text-sm text-muted-foreground">
                {t('confidence')}: {Math.round(fishData.confidence * 100)}%
              </div>
            </div>
          </div>
        )}
        
        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
      
      <CardFooter className="flex justify-center gap-4">
        {cameraActive && (
          <Button onClick={takePicture}>{t('takePicture')}</Button>
        )}
        
        {imageCapture && (
          <Button onClick={resetCamera}>{t('newPicture')}</Button>
        )}
        
        {recognizing && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-fischer-blue animate-pulse" />
            <span>{t('recognizing')}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CameraCapture;
