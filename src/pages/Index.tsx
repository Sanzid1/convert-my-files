import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FormatSelector from '@/components/FormatSelector';
import ConversionProgress from '@/components/ConversionProgress';
import { Button } from '@/components/ui/button';
import { Download, FileType } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [conversionType, setConversionType] = useState<'image' | 'document'>('image');

  const handleConversion = async () => {
    if (!selectedFile) return;

    setConverting(true);
    setProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate conversion delay
    setTimeout(() => {
      clearInterval(interval);
      setConverting(false);
      setProgress(100);
      // In a real implementation, we would convert the file here
      setConvertedUrl(URL.createObjectURL(selectedFile));
      toast.success('Conversion completed!');
    }, 5000);
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const link = document.createElement('a');
      link.href = convertedUrl;
      link.download = `converted.${targetFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConvertedUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-down">
          <h1 className="text-4xl font-bold text-gray-900">
            Free File Converter
          </h1>
          <p className="text-xl text-gray-600">
            Convert your files to any format instantly
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <Tabs defaultValue="image" onValueChange={(value) => setConversionType(value as 'image' | 'document')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image">Image Converter</TabsTrigger>
              <TabsTrigger value="document">Document Converter</TabsTrigger>
            </TabsList>
            <TabsContent value="image" className="space-y-8">
              {!selectedFile ? (
                <FileUpload onFileSelect={handleFileSelect} type="image" />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <p className="text-gray-600">
                      Selected: {selectedFile.name}
                    </p>
                    <FormatSelector
                      value={targetFormat}
                      onChange={setTargetFormat}
                      type="image"
                    />
                  </div>
                  {converting ? (
                    <ConversionProgress progress={progress} />
                  ) : (
                    <div className="flex justify-center">
                      {!convertedUrl ? (
                        <Button
                          onClick={handleConversion}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Convert Now
                        </Button>
                      ) : (
                        <Button
                          onClick={handleDownload}
                          className="bg-success hover:bg-success/90"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="document" className="space-y-8">
              {!selectedFile ? (
                <FileUpload onFileSelect={handleFileSelect} type="document" />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <p className="text-gray-600">
                      Selected: {selectedFile.name}
                    </p>
                    <FormatSelector
                      value={targetFormat}
                      onChange={setTargetFormat}
                      type="document"
                    />
                  </div>
                  {converting ? (
                    <ConversionProgress progress={progress} />
                  ) : (
                    <div className="flex justify-center">
                      {!convertedUrl ? (
                        <Button
                          onClick={handleConversion}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Convert Now
                        </Button>
                      ) : (
                        <Button
                          onClick={handleDownload}
                          className="bg-success hover:bg-success/90"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Ad Space */}
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm border text-center">
          <p className="text-gray-500">Advertisement Space</p>
        </div>
      </div>
    </div>
  );
};

export default Index;