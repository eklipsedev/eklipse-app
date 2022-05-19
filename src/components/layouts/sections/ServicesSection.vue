<template>
  <base-section class="section--orange">
    <base-container>
      <div class="grid">
        <div id="main">
          <h2 class="heading-container">
            <span>Our</span
            ><heading-to-move
              secondary="true"
              text="services"
            ></heading-to-move>
          </h2>
          <p class="p--secondary">
            We believe success on the internet relies equally on each key pillar
            of service. Each playing a crucial role in maintaining the integrity
            of the next. Sharing the collective goal to drive traffic and
            convert customers.
          </p>
          <div class="spacer-helper">
            <base-button link to="/services" class="button"
              >Learn more</base-button
            >
          </div>
        </div>
        <div id="services">
          <div class="grid grid-small">
            <div class="relative">
              <h3>Web &amp; Native Design</h3>
              <p class="p--small p--secondary">
                UI &amp; UX heavily influences customer perception and overall
                website performance. eklipse specializes in conversion
                optimization that can craft state of the art user experiences.
              </p>
              <div class="number-text number-text--secondary">01</div>
            </div>
            <div class="relative">
              <h3>Web Development</h3>
              <p class="p--small p--secondary">
                We build websites that can scale multi-nationally and to
                millions of dollars in online sales or unique monthly visitors.
                We create unique, compelling and valuable online experiences for
                our clients.
              </p>
              <div class="number-text number-text--secondary">02</div>
            </div>
            <div class="relative">
              <h3>Strategy &amp; Consultation</h3>
              <p class="p--small p--secondary">
                Not sure how to implement a new technology, integrate
                applications, automate a process or simply improve your website?
                eklipse can devise a plan that delivers ROI and real business
                results.
              </p>
              <div class="number-text number-text--secondary">03</div>
            </div>
          </div>
        </div>
      </div>
    </base-container>
  </base-section>
</template>

<style scoped>

.heading-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.heading-container span {
  margin-right: 10px;
}
</style>
