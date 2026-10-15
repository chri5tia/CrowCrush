// Based on code at https://codepen.io/tholman/pen/ifDak by Tim Holman
function dotsplash() {
  var canvas;
  var context;

  var width;
  var height;

  this.initialize = function () {
    canvas = document.getElementById("canvas");

    if (!canvas) {
      console.warn("dotsplash: Canvas element not found.");
      return;
    }

    context = canvas.getContext("2d");

    if (!context) {
      console.warn("dotsplash: 2D context unavailable.");
      return;
    }

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Pre-populate the background
    prepopulateBackground();
  };

  // Function to generate a random whimsical color
  function getWhimsicalColor(opacity) {
    var category = Math.random();

    var r, g, b;

    if (category < 0.25) {
      var greyValue = Math.floor(Math.random() * 100); // Black and grey
      r = g = b = greyValue;
    } else if (category < 0.5) {
      var baseValue = Math.floor(Math.random() * 100); // Deep dark colors
      var variation = Math.floor(Math.random() * 50);
      r = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);
      g = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);
      b = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);
    } else {
      r = Math.floor(Math.random() * 256); // Bright colors
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      if (Math.random() < 0.5) {
        r = Math.min(255, r + 150);
        g = Math.min(255, g + 150);
        b = Math.min(255, b + 150);
      }
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  var prepopulateBackground = function () {
    const totalClusters = 2; // Total number of clusters
    const blackClusters = 1; // Number of black clusters

    // Helper function to draw a cluster
    function drawCluster(clusterX, clusterY, clusterSize, clusterColor) {
      context.fillStyle = clusterColor;
      context.strokeStyle = clusterColor;

      const shapesInCluster = Math.floor(Math.random() * 5) + 1; // 1-5 shapes per cluster

      for (let j = 0; j < shapesInCluster; j++) {
        const offsetX = (Math.random() - 0.5) * clusterSize * 10; // Tight grouping
        const offsetY = (Math.random() - 0.5) * clusterSize * 10;
        const x = clusterX + offsetX;
        const y = clusterY + offsetY;
        const size = Math.random() * clusterSize;

        context.lineWidth = Math.random() * size;

        const shapeType = Math.random();
        context.beginPath();

        if (shapeType < 0.4) {
          // Jagged line
          for (let k = 0; k < 5; k++) {
            context.lineTo(
              x + Math.random() * size * 10 - size * 5,
              y + Math.random() * size * 10 - size * 5
            );
          }
        } else if (shapeType < 0.7) {
          // Distorted circle
          const radiusX = size * 100 * Math.random();
          const radiusY = size * 100 * Math.random();
          context.ellipse(
            x,
            y,
            radiusX,
            radiusY,
            Math.random() * Math.PI,
            0,
            Math.PI * 2
          );
        } else {
          // Small polygon
          const sides = Math.floor(Math.random() * 8) + 3;
          const angleStep = (Math.PI * 2) / sides;
          const radius = size * 200;
          for (let k = 0; k < sides; k++) {
            const angle = k * angleStep;
            context.lineTo(
              x + radius * Math.cos(angle) + Math.random() * size * 2,
              y + radius * Math.sin(angle) + Math.random() * size * 2
            );
          }
        }

        context.closePath();
        context.stroke();
        context.fill();
      }
    }

    // Draw black clusters
    for (let i = 0; i < blackClusters; i++) {
      const clusterX = Math.random() * width;
      const clusterY = Math.random() * height;
      const clusterSize = Math.random() * 5;
      drawCluster(clusterX, clusterY, clusterSize, "rgba(0, 0, 0, 0.08)");
    }

    // Draw random color clusters
    for (let i = 0; i < totalClusters - blackClusters; i++) {
      const clusterX = Math.random() * width;
      const clusterY = Math.random() * height;
      const clusterSize = Math.random() * 15;
      const clusterColor = getWhimsicalColor(0.05);
      drawCluster(clusterX, clusterY, clusterSize, clusterColor);
    }
  };
}

var app = new dotsplash();
app.initialize();