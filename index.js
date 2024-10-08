let variant;
let banner;
let abRadioButtons;
let inStoreRadioButtons;
let fulfillmentRadioButtons;
let recencyRadioButtons;
let modalityRadioButtons;
let boostRadioButtons;
let membershipTierButtons;
let streamingRedemptionButtons;
let renewalFrequencyButtons;
let previewType = "";
let linkData;
let previewLink;
let link;
let params = [];

function FillUserSelections(element, selections) {
    for (const radio of element) {
        if (radio.checked && radio.value !== "") {
            if(Array.isArray(selections)){
                selections.push(radio.value)
            }
            else{
                return radio.value
            }
        }
    }
}
function GenerateCode() {
    params = [];

    variant = document.getElementById('variantInput').value;
    banner = document.getElementById('banner').value;
    abRadioButtons = document.getElementsByName('abTest');
    inStoreRadioButtons = document.getElementsByName('inStore');
    fulfillmentRadioButtons = document.getElementsByName('fulfillmentType');
    recencyRadioButtons = document.getElementsByName('recency');
    modalityRadioButtons = document.getElementsByName('modality');
    boostRadioButtons = document.getElementsByName('boostStatus');
    membershipTierButtons = document.getElementsByName('membershipTier');
    streamingRedemptionButtons = document.getElementsByName('streamingRedemption');
    renewalFrequencyButtons = document.getElementsByName('renewalFrequency');
    previewType = document.getElementsByName('pageType');

    let userSelections = [
        variant,
        banner,
        abRadioButtons,
        inStoreRadioButtons,
        fulfillmentRadioButtons,
        recencyRadioButtons,
        modalityRadioButtons,
        boostRadioButtons,
        membershipTierButtons,
        streamingRedemptionButtons,
        renewalFrequencyButtons
    ]

    for(let i = 0; i < userSelections.length; i++) {
        FillUserSelections(userSelections[i], params);
    }

    previewLink = FillUserSelections(previewType, previewLink);

    if (previewLink === 'true'){
        link = "://amp/preview/";
    }
    else{
        link = "://amp/";
    }

    if (params.length === 0) {
        linkData = `${banner}${link}${variant}`;
    } else {
        let queryString = params.length === 1
            ? `?${params[0]}`
            : `?${params.join('&')}`;

        linkData = `${banner}${link}${variant}${queryString}`;
    }

    // Clear previous QR code
    let qrCodeContainer = document.getElementById('qrCodeCanvas');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code if any

    // Generate the QR code
    let qr = new QRious({
        element: document.getElementById('qrCodeCanvas'),
        value: linkData,
        size: 200
    });

    // Convert the canvas to an image
    let qrCodeImage = document.getElementById('qrCodeImage');
    qrCodeImage.src = qr.toDataURL(); // Convert canvas to image
    qrCodeImage.style.display = "block"; // Show the image
    for (let i = 0; i < params.length; i++) {
        console.log(params[i]);
    }

}





document.getElementById('generateCode').addEventListener('click', GenerateCode);

