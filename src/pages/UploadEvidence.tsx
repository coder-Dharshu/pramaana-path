import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Upload, FileText, Image, File, CheckCircle, X, 
  ArrowRight, Folder, Hospital, Shield, Camera
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const categories = [
  { id: "land", name: "Land Records", icon: FileText, color: "bg-primary/10 text-primary" },
  { id: "medical", name: "Medical Reports", icon: Hospital, color: "bg-success/10 text-success" },
  { id: "police", name: "Police Complaint", icon: Shield, color: "bg-destructive/10 text-destructive" },
  { id: "photos", name: "Photos/Videos", icon: Camera, color: "bg-accent/10 text-accent" },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  progress: number;
  completed: boolean;
}

export default function UploadEvidence() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("land");
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      category: selectedCategory,
      progress: 0,
      completed: false,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, progress: 100, completed: true } : f
            )
          );
        } else {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });
  }, [selectedCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    return File;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h1 className="text-3xl md:text-display-sm font-bold text-foreground mb-4">
                Upload Your Evidence
              </h1>
              <p className="text-lg text-muted-foreground">
                Add supporting documents, photos, and records. Our AI will analyze and organize them.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Category Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "border-accent bg-accent/5 shadow-lg"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Upload Zone */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  {...getRootProps()}
                  className={`upload-zone text-center ${isDragActive || isDragging ? "dragging" : ""}`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Upload className={`w-10 h-10 ${isDragActive ? "text-accent" : "text-muted-foreground"}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {isDragActive ? "Drop files here" : "Drag & drop files here"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse from your device
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, JPG, PNG, MP4 (Max 50MB each)
                  </p>
                </div>
              </motion.div>

              {/* Uploaded Files */}
              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Folder className="w-5 h-5 text-accent" />
                      Uploaded Evidence ({uploadedFiles.length})
                    </h3>

                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => {
                        const FileIcon = getFileIcon(file.type);
                        const category = categories.find(c => c.id === file.category);

                        return (
                          <motion.div
                            key={file.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="card-premium flex items-center gap-4"
                          >
                            <div className={`w-12 h-12 rounded-xl ${category?.color || "bg-secondary"} flex items-center justify-center flex-shrink-0`}>
                              <FileIcon className="w-6 h-6" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-foreground truncate">{file.name}</p>
                                {file.completed ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-success"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </motion.div>
                                ) : (
                                  <span className="text-sm text-muted-foreground">
                                    {Math.round(file.progress)}%
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="flex-1">
                                  <Progress value={file.progress} className="h-2" />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>

                              <p className="text-xs text-muted-foreground mt-1">
                                Category: {category?.name}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFile(file.id)}
                              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-10"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/dashboard">
                    <Button className="btn-hero flex items-center gap-3">
                      Continue to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingAssistant />
      </div>
    </PageTransition>
  );
}
