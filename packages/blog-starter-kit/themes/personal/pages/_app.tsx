import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import '../styles/index.css';

const GA_ID = 'G-88DZNE6SZH';

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		(window as any).adjustIframeSize = (id: string, newHeight: string) => {
			const i = document.getElementById(id);
			if (!i) return;
			// eslint-disable-next-line radix
			i.style.height = `${parseInt(newHeight)}px`;
		};
	}, []);
	return (
		<ThemeProvider attribute="class">
			{/* Google Analytics */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="ga-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_ID}');
				`}
			</Script>
			{/* Airbridge */}
			<Script id="airbridge-init" strategy="afterInteractive">
				{`
					(function(a_,i_,r_,_b,_r,_i,_d,_g,_e){if(!a_[_b]){var d={queue:[]};_r.concat(_i).forEach(function(a){var i_=a.split("."),a_=i_.pop();i_.reduce(function(a,i_){return a[i_]=a[i_]||{}},d)[a_]=function(){d.queue.push([a,arguments])}});a_[_b]=d;a_=i_.getElementsByTagName(r_)[0];i_=i_.createElement(r_);i_.onerror=function(){d.queue.filter(function(a){return 0<=_i.indexOf(a[0])}).forEach(function(a){a=a[1];a=a[a.length-1];"function"===typeof a&&a("error occur when load airbridge")})};i_.async=1;i_.src="//static.airbridge.io/sdk/latest/airbridge.min.js";a_.parentNode.insertBefore(i_,a_)}})(window,document,"script","airbridge","init fetchResource setBanner setDownload setDownloads setDeeplinks sendWeb setUserAgent setUserAlias addUserAlias setMobileAppData setUserId setUserEmail setUserPhone setUserAttributes clearUser setDeviceIFV setDeviceIFA setDeviceGAID events.send events.signIn events.signUp events.signOut events.purchased events.addedToCart events.productDetailsViewEvent events.homeViewEvent events.productListViewEvent events.searchResultViewEvent".split(" "),["events.wait"]);
					airbridge.init({
						app: 'songyunseop',
						webToken: '60f842c2c3ba47188511d66d01824ed6',
						utmParsing: true
					});
				`}
			</Script>
			<Component {...pageProps} />
			<Analytics />
		</ThemeProvider>
	);
}
