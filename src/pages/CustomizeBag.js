import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaPaintBrush, FaFont, FaImage, FaUndo, FaRedo, FaSave, FaDownload, FaPalette } from 'react-icons/fa';

const CustomizeBag = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [bagColor, setBagColor] = useState('#C8E6C9');
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bagImage, setBagImage] = useState(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
  const colorOptions = [
    { name: 'Mint', value: '#C8E6C9' },
    { name: 'Lavender', value: '#D1C4E9' },
    { name: 'Sky Blue', value: '#BBDEFB' },
    { name: 'Lemon', value: '#FFF59D' },
    { name: 'Rose', value: '#F8BBD0' },
    { name: 'Teal', value: '#B2DFDB' },
    { name: 'Peach', value: '#FFCCBC' }
  ];
  
  // Helper function to shade color
  const shadeColor = (color, percent) => {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255) ? R : 255;  
    G = (G<255) ? G : 255;  
    B = (B<255) ? B : 255;  

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  };
  
  // Fallback for roundRect for browsers that don't support it
  const roundRectFallback = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  
  const drawPlaceholderBag = (context, color) => {
    if (!context) return;
    
    const canvas = canvasRef.current;
    const bagWidth = canvas.width * 0.7;
    const bagHeight = canvas.height * 0.8;
    const x = (canvas.width - bagWidth) / 2;
    const y = (canvas.height - bagHeight) / 2;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the bag shape
    context.fillStyle = color;
    
    // Use roundRect if available, otherwise use fallback
    if (context.roundRect) {
      context.beginPath();
      context.roundRect(x, y, bagWidth, bagHeight, 15);
      context.fill();
    } else {
      roundRectFallback(context, x, y, bagWidth, bagHeight, 15);
      context.fill();
    }
    
    // Add some shading for dimension
    const handleWidth = bagWidth * 0.4;
    const handleHeight = bagHeight * 0.1;
    const handleX = x + (bagWidth - handleWidth) / 2;
    const handleY = y - handleHeight / 2;
    
    // Draw handle
    context.fillStyle = shadeColor(color, -10);
    
    if (context.roundRect) {
      context.beginPath();
      context.roundRect(handleX, handleY, handleWidth, handleHeight, 10);
      context.fill();
    } else {
      roundRectFallback(context, handleX, handleY, handleWidth, handleHeight, 10);
      context.fill();
    }
    
    // Add some shading to bottom of bag
    context.fillStyle = shadeColor(color, -15);
    context.beginPath();
    context.moveTo(x, y + bagHeight * 0.8);
    context.lineTo(x + bagWidth, y + bagHeight * 0.8);
    context.lineTo(x + bagWidth, y + bagHeight);
    context.lineTo(x, y + bagHeight);
    context.closePath();
    context.fill();
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext('2d');
    setCtx(context);
    
    const img = new Image();
    img.src = '/erayasBagDesign.png';
    
    img.onload = () => {
      setBagImage(img);
      
      drawBagWithColor(context, img, bagColor);
      
      saveState(canvas);
      
      setIsCanvasReady(true);
    };
    
    img.onerror = (e) => {
      console.error("Error loading bag image:", e);
      drawPlaceholderBag(context, bagColor);
      saveState(canvas);
      setIsCanvasReady(true);
    };
  }, []);
  
  useEffect(() => {
    if (!ctx || (!bagImage && !isCanvasReady)) return;
    
    if (bagImage) {
      drawBagWithColor(ctx, bagImage, bagColor);
    } else {
      drawPlaceholderBag(ctx, bagColor);
    }
    
    saveState(canvasRef.current);
  }, [bagColor]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!ctx || (!bagImage && !isCanvasReady)) return;
      
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Save current drawing
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Redraw bag and saved drawing
      if (bagImage) {
        drawBagWithColor(ctx, bagImage, bagColor);
      } else {
        drawPlaceholderBag(ctx, bagColor);
      }
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ctx, bagImage, isCanvasReady, bagColor]);
  
  // Draw bag function with color overlay
  const drawBagWithColor = (context, img, color) => {
    if (!context || !img) return;
    
    // Clear canvas
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const aspectRatio = img.width / img.height;
    
    let drawWidth, drawHeight;
    
    // Calculate dimensions to maintain aspect ratio and fit within canvas
    if (canvas.width / canvas.height > aspectRatio) {
      drawHeight = canvas.height * 0.85;
      drawWidth = drawHeight * aspectRatio;
    } else {
      drawWidth = canvas.width * 0.85;
      drawHeight = drawWidth / aspectRatio;
    }
    
    // Draw bag centered
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;
    
    // First draw the bag image
    context.drawImage(img, x, y, drawWidth, drawHeight);
    
    // Then apply color overlay using composite operation
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = color;
    context.globalAlpha = 0.8; // Adjust transparency to allow some texture to show through
    context.fillRect(x, y, drawWidth, drawHeight);
    
    // Reset composite operation and alpha
    context.globalCompositeOperation = 'source-over';
    context.globalAlpha = 1.0;
  };
  
  // Save canvas state
  const saveState = (canvas) => {
    if (!canvas) return;
    
    try {
      const imageData = canvas.toDataURL();
      const newHistory = [...history.slice(0, historyIndex + 1), imageData];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } catch (e) {
      console.error("Error saving canvas state:", e);
    }
  };
  
  // Undo function
  const undo = () => {
    if (historyIndex > 0 && ctx) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };
  
  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1 && ctx) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };
  
  // Start drawing
  const startDrawing = (e) => {
    if (tool === 'brush' && ctx) {
      setIsDrawing(true);
      const rect = canvasRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      
      // Scale coordinates for high-DPI displays
      const scale = canvasRef.current.width / rect.width;
      x *= scale;
      y *= scale;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
    }
  };
  
  // Draw
  const draw = (e) => {
    if (!isDrawing || tool !== 'brush' || !ctx) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    // Scale coordinates for high-DPI displays
    const scale = canvasRef.current.width / rect.width;
    x *= scale;
    y *= scale;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  // End drawing
  const endDrawing = () => {
    if (isDrawing && ctx) {
      setIsDrawing(false);
      ctx.closePath();
      saveState(canvasRef.current);
    } else {
      setIsDrawing(false);
    }
  };
  
  // Add text
  const addText = () => {
    if (text.trim() === '' || !ctx) return;
    
    const canvas = canvasRef.current;
    
    // Center text on bag
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    
    ctx.font = '24px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    
    saveState(canvas);
    setText('');
  };
  
  // Add image
  const addImage = (e) => {
    if (!ctx) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        
        // Calculate dimensions to maintain aspect ratio and fit within bag
        const bagWidth = canvas.width * 0.5;
        const bagHeight = canvas.height * 0.5;
        let imgWidth = img.width;
        let imgHeight = img.height;
        
        if (imgWidth > bagWidth) {
          imgHeight = imgHeight * (bagWidth / imgWidth);
          imgWidth = bagWidth;
        }
        
        if (imgHeight > bagHeight) {
          imgWidth = imgWidth * (bagHeight / imgHeight);
          imgHeight = bagHeight;
        }
        
        // Draw image centered on bag
        const x = (canvas.width - imgWidth) / 2;
        const y = (canvas.height - imgHeight) / 2;
        
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
        saveState(canvas);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  // Save design
  const saveDesign = () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'erayasBagDesign.png';
      link.click();
    } catch (e) {
      console.error("Error saving design:", e);
      alert("There was an error saving your design. Please try again.");
    }
  };
  
  return (
    <section className="customize-page">
      <Container>
        <h1 className="section-title mb-4">Customize Your Bag</h1>
        <p className="section-subtitle mb-5">Design a unique bag that reflects your personal style</p>
        
        <Row>
          <Col md={3}>
            <div className="customize-toolbar">
              <h5 className="text-white mb-3">Tools</h5>
              
              {/* Bag Color Selection */}
              <div className="mb-4">
                <label className="text-white d-block mb-2">
                  <FaPalette className="me-2" />
                  Bag Color
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {colorOptions.map((colorOption) => (
                    <div 
                      key={colorOption.value}
                      onClick={() => setBagColor(colorOption.value)}
                      className="color-option"
                      title={colorOption.name}
                      style={{
                        backgroundColor: colorOption.value,
                        width: '30px',
                        height: '30px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: bagColor === colorOption.value ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
                        boxShadow: bagColor === colorOption.value ? '0 0 0 2px var(--primary-color)' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-white-50 small">
                  Selected: {colorOptions.find(c => c.value === bagColor)?.name || 'Custom'}
                </div>
              </div>
              
              <div className="mb-3">
                <Button 
                  className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                  onClick={() => setTool('brush')}
                >
                  <FaPaintBrush /> Draw
                </Button>
              </div>
              
              <div className="mb-3">
                <label className="text-white d-block mb-2">Brush Size</label>
                <Form.Range
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                />
              </div>
              
              <div className="mb-3">
                <label className="text-white d-block mb-2">Drawing Color</label>
                <input
                  type="color"
                  className="color-picker"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label className="text-white d-block mb-2">Add Text</label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={addText} className="tool-btn w-100">
                  <FaFont /> Add Text
                </Button>
              </div>
              
              <div className="mb-3">
                <label className="text-white d-block mb-2">Add Image</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={addImage}
                  style={{ display: 'none' }}
                />
                <Button 
                  onClick={() => fileInputRef.current.click()} 
                  className="tool-btn w-100"
                >
                  <FaImage /> Upload Image
                </Button>
              </div>
              
              <div className="mb-3 d-flex">
                <Button onClick={undo} className="tool-btn flex-grow-1 me-2">
                  <FaUndo />
                </Button>
                <Button onClick={redo} className="tool-btn flex-grow-1">
                  <FaRedo />
                </Button>
              </div>
              
              <Button onClick={saveDesign} className="btn-primary w-100">
                <FaDownload className="me-2" /> Save Design
              </Button>
            </div>
          </Col>
          
          <Col md={9}>
            <div className="customize-canvas" style={{ position: 'relative' }}>
              {!isCanvasReady && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.1)',
                  zIndex: 10
                }}>
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading canvas...</p>
                  </div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                className="w-100 h-100"
                style={{ 
                  cursor: tool === 'brush' ? 'crosshair' : 'default',
                  pointerEvents: isCanvasReady ? 'auto' : 'none'
                }}
              />
            </div>
            
            <div className="mt-4 text-center">
              <Button size="lg" className="btn-primary">
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomizeBag;