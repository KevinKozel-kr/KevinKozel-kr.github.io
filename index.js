
document.getElementById('generateCode').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const variant = document.getElementById('variantInput').value;
    const banner = document.getElementById('banner').value;
    const abRadioButtons = document.getElementsByName('abTest');
    const inStoreRadioButtons = document.getElementsByName('inStore');
    const fulfillmentRadioButtons = document.getElementsByName('fulfillmentType');
    const recencyRadioButtons = document.getElementsByName('recency');
    const modalityRadioButtons = document.getElementsByName('modality');
    const boostRadioButtons = document.getElementsByName('boostStatus');

    let params = [];
    let abTest = ""; // Initialize abTest
    for (const radio of abRadioButtons) {
        if (radio.checked) {
            abTest = radio.value;
            if (abTest !== ""){
                params.push(abTest);
            }
            break;
        }
    }

    let inStore = "";
    for (const radio of inStoreRadioButtons) {
        if (radio.checked) {
            inStore = radio.value;
            if (inStore !== ""){
                params.push(inStore);
            }
            break;
        }
    }

    let fulfillment = ""; // Initialize abTest
    for (const radio of fulfillmentRadioButtons) {
        if (radio.checked) {
            fulfillment = radio.value;
            if (fulfillment !== ""){
                params.push(fulfillment);
            }
            break;
        }
    }

    let recency = "";
    for (const radio of recencyRadioButtons) {
        if (radio.checked) {
            recency = radio.value;
            if (recency !== ""){
                params.push(recency);
            }
            break;
        }
    }

    let boost = ""; // Initialize abTest
    for (const radio of boostRadioButtons) {
        if (radio.checked) {
            boost = radio.value;
            if (boost !== ""){
                params.push(boost);
            }
            break;
        }
    }

    let modality = "";
    for (const radio of modalityRadioButtons) {
        if (radio.checked) {
            modality = radio.value;
            if (modality !== ""){
                params.push(modality);
            }
            break;
        }
    }


    // Check for empty fields


    // Construct the LinkData
    const link = "://amp/preview/";

    let linkData;

    if (params.length === 0) {
        linkData = `${banner}${link}${variant}`;
    } else {
        const queryString = params.length === 1
            ? `?${params[0]}`
            : `?${params.join('&')}`;

        linkData = `${banner}${link}${variant}${queryString}`;
    }

    // Clear previous QR code
    const qrCodeContainer = document.getElementById('qrCodeCanvas');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code if any

    // Generate the QR code
    const qr = new QRious({
        element: document.getElementById('qrCodeCanvas'),
        value: linkData,
        size: 200
    });

    // Convert the canvas to an image
    const qrCodeImage = document.getElementById('qrCodeImage');
    qrCodeImage.src = qr.toDataURL(); // Convert canvas to image
    qrCodeImage.style.display = "block"; // Show the image
    console.log(linkData);
    for(let i=0; i < params.length; i++){
        console.log(params[i]);
    }
});

