let app = {
    pixelContainer: null,
    colorpickerContainer: null,
    currentColor: 'black',
    styles: ['white','black','purple','green','blue','fof'],
    
    /* Function triggered when clicking on a grid cell */
    handlePixelClick: (event) => {
        let pixelClicked = event.target;
        for (let color of app.styles){
            pixelClicked.classList.remove('color--' + color);
        };
        pixelClicked.classList.add('color--' + app.currentColor);
    },

   /* Function triggered when the form is submitted by clicking on the button */
    handleFormSubmit: (event) => {
        event.preventDefault();
        let form = event.target;

        let gridSizeInput = form.querySelector('.gridSizeInput');
        let gridSize = gridSizeInput.value;

        let pixelSizeInput = form.querySelector('.pixelSizeInput');
        let pixelSize = pixelSizeInput.value;

        app.generateGrid(gridSize, pixelSize);
    },

   /*  Function to change the color of the clicked box */
    handleColorCircleClick: (event) => {
        let circleClicked = event.target;
        let colorpickerCircles = document.getElementsByClassName('colorpicker_circle');

        for(let circleColor of colorpickerCircles){
            circleColor.classList.remove('color--selected');
        }
        circleClicked.classList.add('color--selected');

        app.currentColor = circleClicked.dataset.color;
    },

    
    /* Function allowing to clean my pixel container */
    clearInvader: () => {
        app.pixelContainer.innerHTML = '';
    },
    
    /*Allows to generate a grid of Size x Size */
    generateGrid: (gridSize = 8, pixelSize = 30) => {
        app.clearInvader();
        for (let x = 0; x < gridSize; x++) {
            let line = document.createElement('div');
            line.classList.add('pixelLine');
           
        for (let y = 0; y < gridSize; y++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            
            pixel.style.width = pixelSize + 'px';
            pixel.style.height = pixelSize + 'px';
           
            pixel.addEventListener('click', app.handlePixelClick);
            line.appendChild(pixel);
        }
            app.pixelContainer.appendChild(line);
        }
    },

    /* Generating the configuration form */
    generateConfigForm: () => {
        let form = document.querySelector('.configuration');
        let inputField = document.createElement('input');
        
        inputField.setAttribute('type', 'number');
        inputField.setAttribute('min', '0');
        inputField.setAttribute('placeholder', 'Taille de la grille');
        inputField.classList.add('gridSizeInput');

        form.appendChild(inputField);

        let inputPixelSize = document.createElement('input');
        inputPixelSize.setAttribute('type', 'number');
        inputPixelSize.setAttribute('min', '0');
        inputPixelSize.setAttribute('placeholder', 'Taille d\'un pixel');
        inputPixelSize.classList.add('pixelSizeInput');

        form.appendChild(inputPixelSize);

        let buttonValidate = document.createElement('button');
        buttonValidate.classList.add('validateFormBtn');
        buttonValidate.textContent = "Valider"

        form.appendChild(buttonValidate);

        form.addEventListener('submit', app.handleFormSubmit);
    },

   /* Allows you to generate the color picker at the bottom right of the page */
    generateColorPicker: () => {
        app.styles.forEach((color) => {
            let circleColor = document.createElement('div');
            circleColor.classList.add('colorpicker_circle')
            circleColor.classList.add('color--' + color);
            if (color === app.currentColor){
                circleColor.classList.add('color--selected');
            }
            circleColor.addEventListener('click', app.handleColorCircleClick)
            circleColor.dataset.color = color;
            app.colorpickerContainer.appendChild(circleColor)
        });

    },

    /* Function called when the application starts */
    init: () => {
        app.pixelContainer =  document.querySelector('#invader .container');
        app.colorpickerContainer =  document.querySelector('#colorpicker');
        app.generateConfigForm();
        app.generateGrid();
        app.generateColorPicker();
    },
};

document.addEventListener('DOMContentLoaded', app.init)