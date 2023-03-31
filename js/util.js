function encode(value) {
    let done = false;
    let index = 0;
    let encodedValue = "";
    while (!done) {
        let result = value.slice(index, index + 10);
        let ref = getRef(result.length);
        encodedValue+=ref;
        for (let i = 0; i < ref.length; i++) {
            encodedValue += result[ref[i]];
        }
        index += 10;
        if (result.length < 10) {
            done = true;
        }
    }
    return encodedValue;
}

function decode(encodedValue) {
    let done = false;
    let index = 0;
    let decodedValue = "";
    while (!done) {
        let result = encodedValue.slice(index, index + 20);
        let ref = result.slice(0, result.length / 2);
        let value = result.slice(result.length / 2, result.length);
        let decodedPart = Array.from("          ");
        for (let i = 0; i < ref.length; i++) {
            decodedPart[ref[i]]=value[i];
        }
        decodedValue += decodedPart.join('').trimEnd();
        index += 20;
        if (result.length < 20) {
            done = true;
        }
    }
    return decodedValue;
}

function getRef(size) {
    const table = "0123456789";
    return table.slice(0, size).split('').sort(function () {
        return 0.5 - Math.random();
    }).join('');
}

