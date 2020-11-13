let app = {
    // Puis on défini une variable qui va représenter la taille de notre grille
    // On commence par cibler le conteneur où on va écrire nos pixels
    pixelContainer: null,
    colorpickerContainer: null,
    
    // Variable qui va venir stocker la couleur en cours
    currentColor: 'black',

    styles: [
        'white',
        'black',
        'red',
        'green',
        'blue',
        'fof'
    ],
    /**
     * Fonction déclenchée au moment du click sur une case de la grille
     * @param {Event} event 
     */
    handlePixelClick: (event) => {
        // On range dans une variable la référence de l'élément HTML sur lequel j'ai cliqué
        let pixelClicked = event.target;
        // On parcours toutes les couleurs, pour les enlever une par une dans l'élément qu'on vient de cliquer
        for (let color of app.styles){
            // On supprime la classe couleur de la div
            // ( quelle existe ou pas dans cette div, on s'en fou )
            pixelClicked.classList.remove('color--' + color);
        }
        // Puis on applique à cet élément un modifier css
        pixelClicked.classList.add('color--' + app.currentColor);
    },

    /**
     * Fonction déclenchée au moment de la soumission du formulaire
     * Par clic sur le bouton, ou appuie de la touche entrée en focus sur l'input text
     * @param {Event} event 
     */
    handleFormSubmit: (event) => {
        // On empêche le fonctionnement par défaut du formulaire
        // En faisant ça on évite au formulaire de recharger la page
        event.preventDefault();
        // Je récupère la cible de l'évènement, ici c'est le formulaire qu'on soummet, donc la cible c'est le formulaire
        let form = event.target;

        // Récupération de l'input du formulaire gridSizeInput
        let gridSizeInput = form.querySelector('.gridSizeInput');
        let gridSize = gridSizeInput.value;

        // Récupération de l'input du formulaire pixelSizeInput
        let pixelSizeInput = form.querySelector('.pixelSizeInput');
        let pixelSize = pixelSizeInput.value;

        // Je regénère ma grille avec le nombre de cases que je viens de récupérer
        app.generateGrid(gridSize, pixelSize);
    },

    /**
     * Fonction permettant de 
     * @param {Event} event 
     */
    handleColorCircleClick: (event) => {
        // Je récupère le circle sur lequel j'ai cliqué
        let circleClicked = event.target;
        // On applique le modifier sur le circle
        let colorpickerCircles = document.getElementsByClassName('colorpicker_circle');

        // On supprime la classe color--selected sur tout les circles sans exeception
        // Le for ... in fonctionne pour les tableaux et les objets
        // Il permet de parcourir toutes le CLEF du truc qu'il parcours
        // Le for ... of fonction uniquement pour le tableau
        // Il parcours le tableau et donne la valeur de l'itération
        for(let circleColor of colorpickerCircles){
            circleColor.classList.remove('color--selected');
        }
        // Puis on ajoute la classe color--selected sur celui qu'on vient de cliquer
        circleClicked.classList.add('color--selected');
        app.currentColor = circleClicked.dataset.color;
    },

    /**
     * Fonction permettant de nettoyer mon container de pixels
     */
    clearInvader: () => {
        // On vide le contenu HTML de pixelContainer
        // La variable pixelContainer est déclarée tout en haut du fichier
        app.pixelContainer.innerHTML = '';
    },
    /**
     * Permet de générer une grille de gridSize * gridSize
     * @param {number} gridSize 
     * @param {number} pixelSize 
     */
    generateGrid: (gridSize = 8, pixelSize = 30) => {
        app.clearInvader();
        // Il est temps de créer la grille
        // Pour cela il faudra exploiter les boucles et ajouter des élements au DOM
        // Mon premier for sert à créer des lignes
        for (let x = 0; x < gridSize; x++) {
            // Je créé un élément qui va me servir de ligne
            let line = document.createElement('div');
            // Je donne la classe "pixelLine" à ma ligne
            line.classList.add('pixelLine');
            // Mon Deuxième for sert à créer les cases pour chaque lignes
            for (let y = 0; y < gridSize; y++) {
                // Je créé mon carré qui représente un pixel
                // Il est bien dans le document mais caché, il faudra l'ajouter à un élément
                let pixel = document.createElement('div');
                // Je rajoute la classe "pixel" à mon pixel
                pixel.classList.add('pixel');
                // On ajoute une taille custom au pixel
                pixel.style.width = pixelSize + 'px';
                pixel.style.height = pixelSize + 'px';
                // On ajoute un eventListener au pixel qu'on vient de créer
                // ( Comme une configuration de cet élément )
                pixel.addEventListener('click', app.handlePixelClick);
                // On ajoute le pixel en cours ( qu'on vient de créer ) dans la ligne en cours
                line.appendChild(pixel);
            }
            // On ajoute la ligne en cours ( qu'on vient de créer ) dans le container de pixels
            app.pixelContainer.appendChild(line);
        }
    },
    /**
     * Génération du formulaire de configuration
     */
    generateConfigForm: () => {
        // On cible le formulaire où on va créer des éléments
        let form = document.querySelector('.configuration');

        // On va ajouter (toujours en JS) des élements au formulaire
        // On ajoute un champ pour choisir la taille de la grille
        let inputField = document.createElement('input');
        // On lui ajoute l'attribut type="number"
        inputField.setAttribute('type', 'number');
        inputField.setAttribute('min', '0');
        // On lui ajoute l'attribut placeholder="Taille de la grille"
        inputField.setAttribute('placeholder', 'Taille de la grille');
        // On lui ajoute une classe pour le styliser
        inputField.classList.add('gridSizeInput');

        // Puis on ajoute cet input à notre formulaire
        form.appendChild(inputField);


        // On rajoute un champ pour la taille des pixels
        let inputPixelSize = document.createElement('input');
        // On lui ajoute l'attribut type="number"
        inputPixelSize.setAttribute('type', 'number');
        inputPixelSize.setAttribute('min', '0');
        // On lui ajoute l'attribut placeholder="Taille d'un pixel"
        inputPixelSize.setAttribute('placeholder', 'Taille d\'un pixel');
        // On lui ajoute une classe pour le styliser
        inputPixelSize.classList.add('pixelSizeInput');

        // Puis on ajoute cet input à notre formulaire
        form.appendChild(inputPixelSize);

        // On ajoute un bouton pour valider
        // On commence par créer le bouton
        let buttonValidate = document.createElement('button');
        // Puis on lui ajoute une classe
        buttonValidate.classList.add('validateFormBtn');
        // Puis on lui met le texte "Valider"
        buttonValidate.textContent = "Valider"
        // Puis on ajoute ce bouton à notre formulaire
        form.appendChild(buttonValidate);


        // Lorsqu'on soumet le formulaire on veut générer une nouvelle grille à la place de la grille actuelle, mais en tenant compte de la taille saisie dans le champ
        form.addEventListener('submit', app.handleFormSubmit);

        // Par exemple l'utilisateur saisit 10 dans le champ, il valide, une nouvelle grille de 10 cases x 10 cases est générée à la place de la grille existante
    },

    /**
     * Permet de générer le color picker en bas à droite de la page
     */
    generateColorPicker: () => {
        // Ici on parcours le tableau styles avec la fonction avancée forEach
        // Pour chaque itération du tableau, la fonction de callback anonyme passée en paramètre est déclenchée. 
        // Elle admet 2 paramètres, le premier c'est l'itération en cours et le second c'est l'index en cours
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
    /**
     * Fonction appelée au démarrage de l'application
     */
    init: () => {
        // J'assigne la variable app.pixelContainer dans la fonction init
        // Parce que si je le fait en dehors, ex : au moment où je déclare la propriété en haut de l'objet app, le script sera lu et interprété trop tot
        // Le fait de le faire dans la fonction init décale son interprétation à plus tard
        app.pixelContainer =  document.querySelector('#invader .container');
        app.colorpickerContainer =  document.querySelector('#colorpicker');
        app.generateConfigForm();
        app.generateGrid();
        app.generateColorPicker();
    },
};

// On attends que le DOM soit entièrement chargé pour executer mon module
document.addEventListener('DOMContentLoaded', app.init)