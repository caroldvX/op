window.plausible =
	window.plausible ||
	function () {
		(window.plausible.q = window.plausible.q || []).push(arguments);
	};

let userSubscrition;
let subscritionId;
let pushServerPublicKey =
	'BBiRMtSSmxV3CNhJePbk9-jlMQna3WvRXhK9Zle4MW0vv4jF5f3kWcwcTxOG9hmUylTU8Ibmn7tE19Oad_vfkuA';

function isPushNotificationSupported() {
	return 'serviceWorker' in navigator && 'PushManager' in window;
}

function urlBase64ToUint8Array(a) {
	const b = '='.repeat((4 - (a.length % 4)) % 4),
		c = (a + b).replace(/\-/g, '+').replace(/_/g, '/'),
		d = self.atob(c),
		f = new Uint8Array(d.length);
	for (let g = 0; g < d.length; ++g) f[g] = d.charCodeAt(g);
	return f;
}

pushServerPublicKey = urlBase64ToUint8Array(pushServerPublicKey);

function initializePushNotifications() {
	// request user grant to show notification
	return Notification.requestPermission(function (result) {
		return result;
	});
}

function registerServiceWorker() {
	navigator.serviceWorker.register('/sw.js').then(function (swRegistration) {});
}

function createNotificationSubscription() {
	//wait for service worker installation to be ready, and then
	return navigator.serviceWorker.ready.then(function (serviceWorker) {
		// subscribe and return the subscription
		return serviceWorker.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey: pushServerPublicKey,
			})
			.then(function (subscription) {
				return subscription;
			});
	});
}

function getUserSubscription() {
	//wait for service worker installation to be ready, and then
	return navigator.serviceWorker.ready
		.then(function (serviceWorker) {
			return serviceWorker.pushManager.getSubscription();
		})
		.then(function (pushSubscription) {
			return pushSubscription;
		});
}

function sendNotification() {
	http.get(`/send-notification/${subscritionId}/`);
}

/**
 * updates the DOM printing the user consent and activates buttons
 * @param {String} userConsent
 */

//registerServiceWorker()
const pushNotificationSuported = isPushNotificationSupported();
function askUserPermission() {
	if (pushNotificationSuported) {
		initializePushNotifications().then((userConsent) => {
			if (userConsent == 'granted') {
				registerServiceWorker();
				getUserSubscription().then(function (subscrition) {
					if (subscrition) {
						userSubscrition = subscrition;
						sendSubscriptionToPushServer();
					} else {
						susbribeToPushNotification();
					}
				});
			}
		});
	}
}

function susbribeToPushNotification() {
	createNotificationSubscription()
		.then(function (subscrition) {
			userSubscrition = subscrition;
			sendSubscriptionToPushServer();
		})
		.catch((e) => {});
}

function sendSubscriptionToPushServer() {
	let body = {
		subscription: userSubscrition,
		hlog: false,
		url: location.href,
		nicho: 'cartao',
	};

	let attrs = ['utm_source', 'utm_medium', 'utm_campaign'];
	let sources = {};
	let hasHlog = false;

	for (let attr of attrs) {
		if (location.href.includes(attr)) {
			sources[attr] = location.href
				.split(attr + '=')[1]
				.split('&')[0]
				.split('#')[0];
			hasHlog = true;
		}
	}

	if (location.href.split('?')[0].includes('-emp')) {
		body.nicho = 'emprestimo';
	}

	if (location.href.includes('voraciousblog.com')) {
		body.nicho = 'voracious';
	}

	if (location.href.includes('l-en')) {
		body.lang = 'en';
	}

	if (hasHlog) {
		body.hlog = sources;
	}

	http.post('/subscription', body).then(function (response) {
		console.log(`Subscription created!`);
		subscritionId = response.id;
	});
}

let host = 'https://highpu.sh';

function post(path, body) {
	return fetch(`${host}${path}`, {
		credentials: 'omit',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			'sec-fetch-mode': 'cors',
		},
		body: JSON.stringify(body),
		method: 'POST',
		mode: 'cors',
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			return data;
		});
}

function get(path) {
	return fetch(`${host}${path}`, {
		credentials: 'omit',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			'sec-fetch-mode': 'cors',
		},
		method: 'GET',
		mode: 'cors',
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			return data;
		});
}

const http = {
	post: post,
	get: get,
};

const popupTemplate = `<div id="down-popup" style="height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; background: #000000bd; display: none;">
<div style="width: 300px; margin: auto; background: white; margin-top: 200px; padding: 18px; border-radius: 8px;">
<h1 style="font-size: 20px;text-align: center;margin-bottom: 15px;">Confirme para baixar!</h1>
<button onclick="downSubmit()" style="width: 100%" class="download-btn">Não sou um robô →</button>
<p style="text-align: center; margin: 0; padding: 0; ">Clique em permitir para continuar...</p>
<p style="text-align: right; margin: 0; padding: 0; font-size: 10px; margin-top: 20px; cursor: pointer;" onclick="closeDownPopup()">
Fechar</p></div></div>`;

let selectedImg = '';

function insertDownloadButtons() {
	$('body').append(popupTemplate);
}

insertDownloadButtons();

function closeDownPopup() {
	$('#down-popup').hide();
}

function downloadButtonController(imgSource) {
	plausible('download-button', { props: { action: 'click' } });

	selectedImg = imgSource;
	$('#down-popup').show();
}

function downSubmit() {
	if (pushNotificationSuported && Notification.permission == 'default') {
		initializePushNotifications().then((userConsent) => {
			if (userConsent == 'default') {
				plausible('subscription', { props: { action: 'default' } });
			} else if (userConsent == 'granted') {
				plausible('subscription', { props: { action: 'granted' } });
			} else {
				plausible('subscription', { props: { action: 'rejected' } });
			}

			if (userConsent == 'granted') {
				$('body').append(`<div id="tapa-tudo" style="
height: 100vh;
width: 100vh;
position: fixed;
top: 0;
z-index: 9999999999999;"></div>`);

				setTimeout(() => {
					$('#tapa-tudo').remove();
				}, 8000);

				registerServiceWorker();
				getUserSubscription().then(function (subscrition) {
					if (subscrition) {
						userSubscrition = subscrition;
						localSendSubscriptionToPushServer();
					} else {
						localSusbribeToPushNotification();
					}
				});
			} else {
				location.href = selectedImg;
			}
		});
	} else {
		location.href = selectedImg;
	}
}

function localSusbribeToPushNotification() {
	createNotificationSubscription()
		.then(function (subscrition) {
			userSubscrition = subscrition;
			localSendSubscriptionToPushServer();
		})
		.catch((e) => {});
}

function localSendSubscriptionToPushServer() {
	let body = {
		subscription: userSubscrition,
		hlog: false,
		url: location.href,
		nicho: 'S2earch',
	};

	body.lang = 'pt';

	http.post('/subscription', body).then(function (response) {
		console.log(`Subscription created!`);
		subscritionId = response.id;

		location.href = selectedImg;
	});
}
