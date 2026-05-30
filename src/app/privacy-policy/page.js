export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', color: '#ccc', lineHeight: '1.6' }}>
      <h1 style={{ color: '#E50914', marginBottom: '1rem', fontSize: '2.5rem' }}>Privacy Policy</h1>
      <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
        <p style={{ marginBottom: '1rem' }}>Welcome to BlackScreen. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (www.blackscreen.watch) and tell you about your privacy rights and how the law protects you.</p>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Data We Collect</h2>
        <p style={{ marginBottom: '1rem' }}>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#fff' }}>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#fff' }}>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
        </ul>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
        <p style={{ marginBottom: '1rem' }}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>To provide and maintain our Service.</li>
          <li style={{ marginBottom: '0.5rem' }}>To notify you about changes to our Service.</li>
          <li style={{ marginBottom: '0.5rem' }}>To allow you to participate in interactive features of our Service when you choose to do so.</li>
          <li style={{ marginBottom: '0.5rem' }}>To provide customer support.</li>
          <li style={{ marginBottom: '0.5rem' }}>To gather analysis or valuable information so that we can improve our Service.</li>
          <li style={{ marginBottom: '0.5rem' }}>To monitor the usage of our Service.</li>
          <li style={{ marginBottom: '0.5rem' }}>To detect, prevent and address technical issues.</li>
        </ul>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Contact Us</h2>
        <p style={{ marginBottom: '1rem' }}>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>By phone: <a href="tel:+94770796435" style={{ color: '#E50914', textDecoration: 'none' }}>+94 77 079 6435</a></li>
          <li style={{ marginBottom: '0.5rem' }}>By email: <a href="mailto:contact@blackscreen.watch" style={{ color: '#E50914', textDecoration: 'none' }}>contact@blackscreen.watch</a></li>
          <li style={{ marginBottom: '0.5rem' }}>By visiting our website: <a href="https://www.blackscreen.watch" style={{ color: '#E50914', textDecoration: 'none' }}>www.blackscreen.watch</a></li>
        </ul>
      </section>
    </div>
  );
}
