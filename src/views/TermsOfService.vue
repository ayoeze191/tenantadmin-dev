<template>
  <main class="w-full flex items-center font-inter">
    <auth-hero />
    <section class="terms-wrapper">
      <div class="terms-container">
        <h1 class="title">Terms of Service</h1>
        <p class="updated">Last updated November 13, 2025</p>

        <div class="content">
          <h2>Agreement to Our Legal Terms</h2>
          <p>
            We are <strong>Reenato Inc.</strong> ("Company," "we," "us," "our"),
            a company registered in Canada at 17 Dineen Drive, Fredericton, New
            Brunswick E3B 4J9.
          </p>

          <p>
            We operate the website <strong>www.reenato.com</strong> (the
            "Site"), the mobile application <strong>10ants</strong> (the "App"),
            and other related services (collectively, the "Services").
          </p>

          <p>
            10ants is a digital property management platform that enables
            tenants, landlords, and policy makers to manage rentals, payments,
            maintenance, communication, and compliance.
          </p>

          <p>
            By accessing the Services, you confirm that you have read,
            understood, and agreed to be bound by these Legal Terms. If you do
            not agree, you must discontinue use immediately.
          </p>

          <h2>Eligibility</h2>
          <p>
            The Services are intended only for users who are at least
            <strong>18 years old</strong>. Persons under 18 may not use or
            register for the Services.
          </p>

          <h2>1. Our Services</h2>
          <p>
            The Services are not intended for use in jurisdictions where such
            use would violate applicable laws or regulations. Users accessing
            the Services from other locations do so at their own risk and are
            responsible for compliance with local laws.
          </p>

          <p>
            The Services are not designed to comply with industry-specific
            regulations such as HIPAA, FISMA, or GLBA.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            We own or license all intellectual property rights in the Services,
            including content, software, trademarks, and designs.
          </p>

          <p>
            You are granted a limited, non-exclusive, non-transferable,
            revocable license to access and use the Services for personal or
            internal business purposes only.
          </p>

          <p>
            Any unauthorized use constitutes a material breach and may result in
            immediate termination.
          </p>

          <h2>3. User Representations</h2>
          <ul>
            <li>You provide accurate and current registration information</li>
            <li>You have legal capacity to agree to these Terms</li>
            <li>
              You will not use automated or unlawful means to access the
              Services
            </li>
            <li>You will comply with all applicable laws</li>
          </ul>

          <h2>4. User Registration</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and all activities under your account.
          </p>

          <h2>5. Purchases and Payment</h2>
          <p>
            All purchases are <strong>non-refundable</strong>. Prices may change
            at any time. Payments are processed in Canadian Dollars using
            supported payment methods.
          </p>

          <h2>6. Software</h2>
          <p>
            Any software provided is licensed, not sold, and is provided “AS IS”
            without warranties of any kind.
          </p>

          <h2>7. Prohibited Activities</h2>
          <ul>
            <li>Using the Services for unlawful or fraudulent purposes</li>
            <li>Attempting to bypass security features</li>
            <li>Uploading malware, spam, or harmful code</li>
            <li>Harassing, abusing, or impersonating others</li>
            <li>Reverse engineering or scraping the Services</li>
          </ul>

          <h2>8–10. User Contributions & Reviews</h2>
          <p>
            Users may submit content where permitted. You retain ownership of
            your content but grant us a worldwide, royalty-free license to use
            it.
          </p>

          <p>
            We reserve the right to remove, edit, or moderate content at our
            discretion.
          </p>

          <h2>11. Mobile Application License</h2>
          <p>
            You are granted a limited license to use the App on supported
            devices in accordance with App Store and Google Play policies.
          </p>

          <h2>12–14. Third-Party Services & Advertisers</h2>
          <p>
            We are not responsible for third-party websites, content, or
            advertisements linked through the Services.
          </p>

          <h2>15. Services Management</h2>
          <p>
            We may monitor, restrict, suspend, or terminate access to protect
            our Services and users.
          </p>

          <h2>16. Privacy Policy</h2>
          <p>
            Use of the Services is subject to our Privacy Policy. Data is
            processed and stored in Canada.
          </p>

          <h2>17–19. Termination & Modifications</h2>
          <p>
            We may modify or discontinue the Services at any time without
            liability. Your account may be terminated for violations of these
            Terms.
          </p>

          <h2>20. Governing Law</h2>
          <p>
            These Terms are governed by the laws of <strong>Canada</strong>.
          </p>

          <h2>21. Dispute Resolution</h2>
          <p>
            Disputes will first attempt informal resolution and, if necessary,
            binding arbitration seated in Fredericton, Canada.
          </p>

          <h2>22–26. Disclaimer & Liability</h2>
          <p>
            The Services are provided “AS IS.” To the maximum extent permitted
            by law, we disclaim all warranties and limit liability.
          </p>

          <h2>27–29. Electronic Communications & Miscellaneous</h2>
          <p>
            You consent to electronic communications and acknowledge that these
            Terms constitute the entire agreement between you and us.
          </p>

          <h2>30. Contact Us</h2>
          <p>
            <strong>Reenato Inc.</strong><br />
            17 Dineen Drive<br />
            Fredericton, New Brunswick E3B 4J9<br />
            Canada
          </p>

          <p>
            Phone: (+1) 506-476-2406<br />
            Email: <a href="mailto:info@reenato.com">info@reenato.com</a>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import AuthHero from "@/components/AuthHero.vue";
// Static legal document
</script>

<style scoped>
.terms-wrapper {
  background-color: #ffffff;
  padding: 40px 16px;
  color: #000000;
  height: 100vh;
  overflow-y: scroll;
  margin: 0 !important;
  flex: 1;
}

.terms-container {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.updated {
  font-size: 14px;
  color: #00000099;
  margin-bottom: 32px;
}

.content h2 {
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 22px;
  color: #000000;
}

.content p {
  line-height: 1.7;
  margin-bottom: 14px;
  color: #00000099;
}

.content ul {
  padding-left: 20px;
  margin-bottom: 16px;
}

.content li {
  margin-bottom: 8px;
  color: #00000099;
}

a {
  color: #000000;
  text-decoration: underline;
}
</style>
