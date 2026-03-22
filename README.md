# PrakashAI 🌩️

<div align="center">
  <h3><a href="https://youtu.be/GqRE9r5_pXY?si=2z1zpVS26iEn-mer">▶ WATCH OUR LIVE DEMO HERE</a></h3>
  <p>The next-generation smart metering and home energy AI automation platform bridging physical hardware and predictive intelligence.</p>
</div>

---

## ⚠️ Important Note on Interface Errors
If you are interacting with the Web Panel or App and receive an error when asking PrakashAI to control an appliance, **this is expected.** 

PrakashAI relies on bi-directional communication with our custom ESP32 physical hardware controller. It will securely work when connected to our physical device grid. **[Please watch the demo video](https://youtu.be/GqRE9r5_pXY?si=2z1zpVS26iEn-mer)** to see how it operates in tandem with the physical appliances.

## System Architecture

Our repository is strictly decoupled into three powerful domains:

1. **/web_panel:** A beautiful, responsive React/Vite web dashboard featuring interactive Three.js visualizations and full access control.
2. **/backend:** The central intelligence API powering Prakash AI and securely managing telemetry.
3. **/app:** The native Flutter mobile application, actively listening and syncing to the Kill Switch endpoints.
4. **/smart-metering-app:** Firmware deployed natively to hardware.
