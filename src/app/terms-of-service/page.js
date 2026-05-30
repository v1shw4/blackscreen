export const metadata = {
  title: 'Terms of Service',
};

export default function TermsOfService() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', color: '#ccc', lineHeight: '1.6' }}>
      <h1 style={{ color: '#E50914', marginBottom: '1rem', fontSize: '2.5rem' }}>Terms of Service</h1>
      <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '1rem' }}>By accessing or using BlackScreen (www.blackscreen.watch), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Description of Service</h2>
        <p style={{ marginBottom: '1rem' }}>BlackScreen is a movie discovery and streaming platform. We do not host any of the media files on our servers. The service provides links to content hosted on third-party services. We are not responsible for the accuracy, compliance, copyright, legality, decency, or any other aspect of the content of other linked sites.</p>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>3. User Conduct</h2>
        <p style={{ marginBottom: '1rem' }}>You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, impairs or renders the Service less efficient. You agree not to transfer files that contain viruses, trojans or other harmful programs.</p>
      </section>
      
      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Intellectual Property</h2>
        <p style={{ marginBottom: '1rem' }}>The Service and its original content, features, and functionality are and will remain the exclusive property of BlackScreen and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Changes to Terms</h2>
        <p style={{ marginBottom: '1rem' }}>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Contact Us</h2>
        <p style={{ marginBottom: '1rem' }}>If you have any questions about these Terms, please contact us:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>By phone: <a href="tel:+94770796435" style={{ color: '#E50914', textDecoration: 'none' }}>+94 77 079 6435</a></li>
          <li style={{ marginBottom: '0.5rem' }}>By email: <a href="mailto:contact@blackscreen.watch" style={{ color: '#E50914', textDecoration: 'none' }}>contact@blackscreen.watch</a></li>
          <li style={{ marginBottom: '0.5rem' }}>By visiting our website: <a href="https://www.blackscreen.watch" style={{ color: '#E50914', textDecoration: 'none' }}>www.blackscreen.watch</a></li>
        </ul>
      </section>
    </div>
  );
}
