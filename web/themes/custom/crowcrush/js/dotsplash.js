
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

    prepopulateBackground();
  };

  // Generate a random color
  function getGothicWhimsicalColor(opacity) {
    var category = Math.random();
    var r, g, b;

    if (category < 0.25) {
      // Black and grey
      var greyValue = Math.floor(Math.random() * 100);
      r = g = b = greyValue;

    } else if (category < 0.5) {
      // Deep dark colors
      var baseValue = Math.floor(Math.random() * 100);
      var variation = Math.floor(Math.random() * 50);

      r = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);
      g = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);
      b = baseValue + variation * (Math.random() < 0.33 ? 1 : 0);

    } else {
      // Bright colors
      r = Math.floor(Math.random() * 256);
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

  // Generate the background once
  function prepopulateBackground() {
    const totalClusters = 50;
    const blackClusters = 5;

    function drawCluster(clusterX, clusterY, clusterSize, clusterColor) {
      context.fillStyle = clusterColor;
      context.strokeStyle = clusterColor;

      const shapesInCluster = Math.floor(Math.random() * 10) + 1;

      for (let j = 0; j < shapesInCluster; j++) {
        const offsetX = (Math.random() - 0.5) * clusterSize * 10;
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
              x + Math.random() * size * 20 - size * 10,
              y + Math.random() * size * 20 - size * 10
            );
          }

        } else if (shapeType < 0.7) {
          // Distorted circle
          const radiusX = size * 10 * Math.random();
          const radiusY = size * 10 * Math.random();

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
          // Polygon
          const sides = Math.floor(Math.random() * 5) + 3;
          const angleStep = (Math.PI * 2) / sides;
          const radius = size * 10;

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
      const clusterSize = Math.random() * 15;

      drawCluster(
        clusterX,
        clusterY,
        clusterSize,
        "rgba(0, 0, 0, 0.5)"
      );
    }

    // Draw colored clusters
    for (let i = 0; i < totalClusters - blackClusters; i++) {
      const clusterX = Math.random() * width;
      const clusterY = Math.random() * height;
      const clusterSize = Math.random() * 15;
      const clusterColor = getGothicWhimsicalColor(0.3);

      drawCluster(
        clusterX,
        clusterY,
        clusterSize,
        clusterColor
      );
    }
  }
}

// Initialize once the document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    new dotsplash().initialize();
  });
} else {
  new dotsplash().initialize();
}
