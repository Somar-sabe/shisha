import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') { // Check to make sure it's client-side
      const url = 'https://edna.io/wp-content/plugins/whatsapp-widget-generator/js/generator.js?50357';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url;

      const options = {
        host: "https://edna.io",
        enabled: true,
        chatButtonSetting: {
          backgroundColor: "#eba800",
          ctaText: "",
          icon: "whatsapp",
          position: "right",
        },
        brandSetting: {
          backgroundColor: "#eba800",
          brandImg: "https://holster-shop.de/cdn/shop/files/HOLSTER_LOGO-TOBACCO_480x.png?v=1613667512",
          brandName: "Holster UAE",
          brandSubTitle: "Premium Tobacco, Premium Moments",
          ctaText: "Start Chat",
          phoneNumber: "971554291019",
          welcomeText: `🌟 Welcome to Holster UAE! 🌟
          Thank you for reaching out! 😊

          We're here to bring you the finest Shisha tobacco flavors in the UAE, crafted for a premium smoking experience. 🪶💨

          How can we assist you today?
          ✔️ Explore our premium flavors
          ✔️ Place an order
          ✔️ Inquire about delivery
          ✔️ Learn about our offers

          Feel free to send us a message, and our team will get back to you shortly!

          🛒 Shop now for an unmatched Shisha experience.
          📦 Fast delivery across the UAE!

          — Holster UAE Team`
        }
      };

      script.onload = () => {
        if (typeof CreateWhatsappChatWidget === 'function') {
          CreateWhatsappChatWidget(options);
        }
      };

      document.body.appendChild(script);

      // Cleanup script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return null; // This component does not render anything
};

export default ChatWidget;
