let public_key = ''
let private_key = ''
let sha = ''
let signature = ''
let cache = ''


var rsaKey = new RSAKey();
function key() {
    // Tạo khóa RSA với độ dài keySize bits
    const keySize = $('.keySize').val();
    const exponent = "10001";
    rsaKey.generate(keySize, exponent);

    // Lấy public key và private key
    const publicKey = rsaKey.n.toString(16);
    const privateKey = rsaKey.d.toString(16);

    // in dữ liệu ra màn hình
    public_key = publicKey
    private_key = privateKey
    document.getElementById('outputPrivateKey').innerHTML = privateKey
    document.getElementById('outputPublicKey').innerHTML = publicKey
    document.getElementsByClassName('item')[0].style.backgroundColor = '#47c663'
    document.getElementsByClassName('item')[1].style.backgroundColor = '#47c663'
}
var encryptedMessage;
var hexHash;
function inFile(input, textarea) {

    const fileInput = document.getElementById(input);

    //đọc và mã hóa tệp bằng thuật toán SHA-1

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const fileData = event.target.result;
        const hashAlgorithm = 'SHA-1';
        crypto.subtle.digest(hashAlgorithm, fileData).then(hash => {
            hexHash = Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
            sha = hexHash
            document.getElementById(textarea).innerHTML = hexHash
        });
    });
    reader.readAsArrayBuffer(file);
    document.getElementsByClassName('h2-item-text')[0].style.backgroundColor = '#47c663'
        ;
}


function encryption() {
    if (!hexHash) {
        alert('Vui lòng nhập file')
    } else {
        // Mã hóa
        const message = hexHash;
        console.log(message)
        encryptedMessage = rsaKey.encrypt(message);
        console.log(encryptedMessage)
        signature = encryptedMessage
        document.getElementById('DigitalSignatures').innerHTML = encryptedMessage
        document.getElementsByClassName('h2-item-text')[1].style.backgroundColor = '#47c663'
        hexHash = '';
    }
}


//Kiểm tra chữ ký số        
function decryption() {
    const mes = $('#decryption').val()
    var message = ''
    if (!hexHash) {
        message = 'Vui lòng nhập file'
    }
    // Giải mã
    else {
        if (mes != '') {
            try {
                const decryptedMessage = rsaKey.decrypt(mes);
                if (decryptedMessage === hexHash) {
                    document.getElementById('input-3').style.backgroundColor = '#47c663'
                    document.getElementsByClassName('btn-1')[0].style.backgroundColor = '#47c663'
                    message = 'file còn nguyên'
                }
                else {
                    document.getElementById('input-3').style.backgroundColor = '#c64747'
                    document.getElementsByClassName('btn-1')[0].style.backgroundColor = '#c64747'
                    message = 'file bị thay đổi'
                }
            }
            catch (err) {
                document.getElementById('input-3').style.backgroundColor = '#c64747'
                document.getElementsByClassName('btn-1')[0].style.backgroundColor = '#c64747'
                message = 'file bị thay đổi!'
            }
        } else {
            message = 'vui lòng nhập trường Chữ kí số để kiểm tra'
        }
    }
    setTimeout(() => {
        alert(message)
        
    }, 100);
}
