const getApi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

document.addEventListener('DOMContentLoaded', function() {
    function getDeviceModel() {
        if (navigator.userAgent) {
            return navigator.userAgent; 
        } else {
            return 'Device model not available';
        }
    }
    function updateDeviceModel() {
        const deviceModelElement = document.querySelector('.user-name'); 

        if (deviceModelElement) {
            const deviceModel = getDeviceModel(); 
            deviceModelElement.textContent = deviceModel;
        }
    }
    updateDeviceModel();
});



async function checkOnlineStatus() {
    const statusElement = document.getElementById("state");
    const providerNameElement = document.querySelector(".provider-name");
    const providerInfoElement = document.querySelector(".provider-info");

    const isOnline = navigator.onLine;
    const condition = isOnline ? "ONLINE" : "OFFLINE";

    statusElement.textContent = condition;

    if (isOnline) {
        statusElement.classList.add("ONLINE");
        statusElement.classList.remove("OFFLINE");
        try {
            const { org } = await getApi("http://ip-api.com/json/");
            providerNameElement.textContent = org;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        statusElement.classList.add("OFFLINE");
        statusElement.classList.remove("ONLINE");
        providerInfoElement.style.display = "none";
    }
}

function onPageLoaded() {
    checkOnlineStatus();

    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);
}

onPageLoaded();
