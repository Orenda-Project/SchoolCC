import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, RotateCcw, Check, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ProfilePictureEditorProps {
  currentImage?: string;
  onSave: (imageDataUrl: string) => void;
  onCancel: () => void;
  open: boolean;
}

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturate: number;
  grayscale: number;
  sepia: number;
}

const defaultFilters: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
};

const filterPresets = [
  { name: 'Normal', filters: { ...defaultFilters } },
  { name: 'Warm', filters: { ...defaultFilters, saturate: 120, sepia: 20 } },
  { name: 'Cool', filters: { ...defaultFilters, saturate: 90, brightness: 105 } },
  { name: 'B&W', filters: { ...defaultFilters, grayscale: 100 } },
  { name: 'Vintage', filters: { ...defaultFilters, sepia: 40, contrast: 90, saturate: 80 } },
  { name: 'Vivid', filters: { ...defaultFilters, saturate: 140, contrast: 110 } },
];

export function ProfilePictureEditor({ currentImage, onSave, onCancel, open }: ProfilePictureEditorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterSettings>(defaultFilters);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState<'upload' | 'crop' | 'filter'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        loadedImageRef.current = img;
        setSelectedImage(imageUrl);
        setStep('crop');
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setFilters(defaultFilters);
      };
      img.src = imageUrl;
    };
    reader.readAsDataURL(file);
  };

  const getFilterStyle = useCallback(() => {
    return `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%)`;
  }, [filters]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (step !== 'crop') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || step !== 'crop') return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (step !== 'crop') return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || step !== 'crop') return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const applyPreset = (preset: typeof filterPresets[0]) => {
    setFilters(preset.filters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const generateCroppedImage = useCallback((): string | null => {
    if (!loadedImageRef.current || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const img = loadedImageRef.current;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.filter = getFilterStyle();

    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawWidth, drawHeight;

    if (imgAspect > 1) {
      drawHeight = size / zoom;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = size / zoom;
      drawHeight = drawWidth / imgAspect;
    }

    const offsetX = (size - drawWidth * zoom) / 2 + position.x;
    const offsetY = (size - drawHeight * zoom) / 2 + position.y;

    ctx.drawImage(img, offsetX, offsetY, drawWidth * zoom, drawHeight * zoom);

    return canvas.toDataURL('image/png');
  }, [zoom, position, getFilterStyle]);

  const handleSave = () => {
    const croppedImage = generateCroppedImage();
    if (croppedImage) {
      onSave(croppedImage);
    }
  };

  const handleBack = () => {
    if (step === 'filter') {
      setStep('crop');
    } else if (step === 'crop') {
      setStep('upload');
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    if (!open) {
      setStep('upload');
      setSelectedImage(null);
      setFilters(defaultFilters);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      loadedImageRef.current = null;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'upload' && 'Upload Profile Picture'}
            {step === 'crop' && 'Crop & Position'}
            {step === 'filter' && 'Apply Filters'}
          </DialogTitle>
        </DialogHeader>

        <canvas ref={canvasRef} className="hidden" />

        {step === 'upload' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              data-testid="input-profile-picture"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
              data-testid="button-upload-profile-picture"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Camera className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Tap to select a photo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
            {currentImage && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Current picture:</p>
                <img
                  src={currentImage}
                  alt="Current profile"
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              </div>
            )}
          </div>
        )}

        {step === 'crop' && selectedImage && (
          <div className="space-y-4">
            <div
              ref={previewRef}
              className="relative w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-primary/30 cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              data-testid="crop-area"
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="absolute w-full h-full object-cover select-none pointer-events-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  filter: getFilterStyle(),
                }}
                draggable={false}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ZoomOut className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={1}
                  max={3}
                  step={0.1}
                  className="flex-1"
                  data-testid="slider-zoom"
                />
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-center text-muted-foreground">Drag to reposition, zoom to resize</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setStep('filter')} className="flex-1" data-testid="button-next-filters">
                Next: Filters
              </Button>
            </div>
          </div>
        )}

        {step === 'filter' && selectedImage && (
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-primary/30">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  filter: getFilterStyle(),
                }}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Filter Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-2 text-xs rounded-lg border hover:border-primary hover:bg-muted/50 transition-all"
                    data-testid={`button-filter-${preset.name.toLowerCase()}`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-xs">Brightness</Label>
                  <span className="text-xs text-muted-foreground">{filters.brightness}%</span>
                </div>
                <Slider
                  value={[filters.brightness]}
                  onValueChange={([value]) => setFilters(f => ({ ...f, brightness: value }))}
                  min={50}
                  max={150}
                  step={5}
                  data-testid="slider-brightness"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-xs">Contrast</Label>
                  <span className="text-xs text-muted-foreground">{filters.contrast}%</span>
                </div>
                <Slider
                  value={[filters.contrast]}
                  onValueChange={([value]) => setFilters(f => ({ ...f, contrast: value }))}
                  min={50}
                  max={150}
                  step={5}
                  data-testid="slider-contrast"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-xs">Saturation</Label>
                  <span className="text-xs text-muted-foreground">{filters.saturate}%</span>
                </div>
                <Slider
                  value={[filters.saturate]}
                  onValueChange={([value]) => setFilters(f => ({ ...f, saturate: value }))}
                  min={0}
                  max={200}
                  step={10}
                  data-testid="slider-saturation"
                />
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSave} className="flex-1" data-testid="button-save-profile-picture">
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
