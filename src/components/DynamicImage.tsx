"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface DynamicImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  [key: string]: any;
}

const DynamicImage = ({
  src,
  alt = "User uploaded image",
  width = 400,
  height = 300,
  className = "",
  fallbackSrc = "/images/placeholder.png",
  priority = false,
  quality = 75,
  ...props
}: DynamicImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Client-side URL validation
  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!src) {
      setIsValidating(false);
      return;
    }

    // Basic client-side validation
    if (!validateUrl(src)) {
      setIsValid(false);
      setIsValidating(false);
      return;
    }

    // Server-side validation via HEAD request to proxy
    const validateImage = async () => {
      try {
        const response = await fetch(`/api/image-proxy?url=${encodeURIComponent(src)}`, {
          method: 'HEAD'
        });
        
        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.warn('Image validation failed:', error);
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateImage();
  }, [src]);

  // Loading state
  if (isValidating) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-gray-500 text-sm">Validating image...</div>
      </div>
    );
  }

  // Invalid URL or validation failed
  if (!isValid || imageError) {
    // Show fallback image if provided, otherwise show placeholder UI
    if (fallbackSrc) {
      return (
        <Image
          src={fallbackSrc}
          alt={alt || "Fallback image"}
          width={width}
          height={height}
          className={className}
          unoptimized
          {...props}
        />
      );
    }
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Invalid image URL</div>
        </div>
      </div>
    );
  }

  // Create proxied URL
  const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(src)}`;

  return (
    <Image
      src={proxiedSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      onError={() => setImageError(true)}
      unoptimized
      {...props}
    />
  );
};

interface SimpleDynamicImageProps {
  src: string;
  alt?: string;
  [key: string]: any;
}

export const SimpleDynamicImage = ({ src, alt, ...props }: SimpleDynamicImageProps) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    return <div className="bg-gray-200 text-center p-4">Image not available</div>;
  }

  const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(src)}`;

  return (
    <Image
      src={proxiedSrc}
      alt={alt || "Image"}
      onError={() => setImageError(true)}
      unoptimized
      {...props}
    />
  );
};

export default DynamicImage;
