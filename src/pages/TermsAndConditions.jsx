import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600">
          <p className="text-sm italic">Last Updated: May 11, 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Chinamati and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. User Conduct</h2>
            <p>
              You agree not to use the website for any purpose that is unlawful or prohibited by these Terms. You may not use the website in any manner that could damage, disable, overburden, or impair any Chinamati server, or the network(s) connected to any Chinamati server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Limitation of Liability</h2>
            <p>
              In no event will Chinamati, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Governing Law</h2>
            <p>
              These Terms and Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the jurisdiction in which Chinamati is based, without giving effect to any choice or conflict of law provision or rule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: legal@chinamati.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
