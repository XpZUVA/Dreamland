// Hacer una solicitud para obtener el XML
fetch('/datos/ej2.xml')
    .then(response => response.text())
    .then(xmlText => {
    // Crear un nuevo parser XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Mapeo de acrónimos
    const areaAcronyms = {
        "Plaza mayor": "PLA",
        "The Far West": "TFW",
        "Territorio pirata": "PIR",
        "Cool Children Land": "CCL",
        "Calle futura": "FUT"
    };

    // Seleccionar todas las áreas
    const areas = xmlDoc.querySelectorAll('area');

    // Iterar sobre cada área y generar el HTML correspondiente
    areas.forEach((area, index) => {
        const nombre = area.getAttribute('nombre');
        const decoracionNode = area.querySelector('decoracion');
        const decoracion = decoracionNode ? decoracionNode.textContent : '';

      // Obtener el acrónimo del nombre del área
        const areaAcronym = areaAcronyms[nombre];

      // Verificar si hay al menos una atracción en el área
        const atracciones = area.querySelectorAll('atraccion');
        if (atracciones.length > 0 && areaAcronym) {
        // Crear el HTML de las atracciones en forma de tabla
        let atraccionesHTML = `<table border="1" id="${areaAcronym}">`;
        
        // Agregar el nombre del área y su decoración en la primera fila
        atraccionesHTML += `
        <tr>
            <td colspan="8">${nombre} - ${decoracion}</td>
        </tr>
        <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Nivel de intensidad</th>
            <th>Altura mínima</th>
            <th>Altura máxima</th>
            <th>Acceso express</th>
            <th>Fecha de revisión</th>
        </tr>
        `;
        atracciones.forEach(atraccion => {
            const nombreComercialNode = atraccion.querySelector('nombreComercial');
            const estadoNode = atraccion.querySelector('estado');
            const tipoNode = atraccion.querySelector('tipo');
            const lvlIntensidadNode = atraccion.querySelector('lvlIntesidad');
            const alturaMinNode = atraccion.querySelector('alturaMin');
            const alturaMaxNode = atraccion.querySelector('alturaMax');
            const accesoExpressNode = atraccion.querySelector('accesoExpress');
            const fechaRevisionNode = atraccion.querySelector('fechaRevision');

          // Agregar al HTML solo si los nodos existen
        if (nombreComercialNode && estadoNode && tipoNode && lvlIntensidadNode && alturaMinNode && accesoExpressNode) {
            atraccionesHTML += `
            <tr>
                <td>${nombreComercialNode.textContent}</td>
                <td>${estadoNode.textContent}</td>
                <td>${tipoNode.textContent}</td>
                <td>${lvlIntensidadNode.textContent}</td>
                <td>${alturaMinNode.textContent}</td>
                <td>${alturaMaxNode ? alturaMaxNode.textContent : 'N/A'}</td>
                <td>${accesoExpressNode.textContent}</td>
                <td>${fechaRevisionNode ? fechaRevisionNode.textContent : 'N/A'}</td>
            </tr>
            `;
        }
        });
        atraccionesHTML += '</table>';

        // Agregar el HTML generado al documento
        const areaContainer = document.createElement('div');
        areaContainer.innerHTML = atraccionesHTML;
        document.getElementById('areas-container').appendChild(areaContainer);
    }
    });
}).catch(error => console.error('Error al obtener el XML:', error));
