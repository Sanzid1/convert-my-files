import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  type: 'image' | 'document';
}

const FileUpload = ({ onFileSelect, type }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const getAcceptedFiles = (type: 'image' | 'document') => {
    if (type === 'image') {
      return {
        'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff']
      };
    }
    return {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    };
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      onFileSelect(file);
      toast.success('File uploaded successfully!');
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFiles(type),
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-gray-300 hover:border-primary'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <p className="text-lg text-center text-gray-600">
          Drag & drop your {type} file here, or click to select
        </p>
        <p className="text-sm text-gray-500">
          {type === 'image' 
            ? 'Supported formats: PNG, JPG, WEBP, GIF, BMP, TIFF'
            : 'Supported formats: PDF, DOC, DOCX'}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;