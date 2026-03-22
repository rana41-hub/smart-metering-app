# PrakashAI ⚡

<div align="center">
  <h3><a href="https://youtu.be/GqRE9r5_pXY?si=2z1zpVS26iEn-mer">▶ WATCH OUR LIVE DEMO HERE</a></h3>
  <p><em>The predictive energy automation platform bridging hardware and AI.</em></p>
</div>

---

## 🛑 The Problem
Traditional power grids and passive energy meters leave consumers in the dark. Users face unpredictable energy costs, a lack of real-time appliance insights, and absolutely no way to dynamically automate or control their high-drain devices to prevent waste.

## 💡 Our Solution
**PrakashAI** is a next-generation smart metering ecosystem. By bridging custom IoT hardware (ESP32) with a predictive AI engine, we provide unprecedented control over home energy consumption. 

From AI-driven routine scheduling and autonomous load balancing, to an integrated Voice Assistant and a secure administrator "Kill Switch" to instantly revoke mobile access—PrakashAI transforms the passive grid into an active, intelligent network.

---

## 🏗️ System Architecture

Our repository is strictly decoupled into four powerful domains:

1. **/web_panel:** A beautiful, responsive React/Vite web dashboard featuring interactive Three.js visualizations and full administrative access control.
2. **/backend:** The central intelligence API powering the conversational AI and securely managing telemetry.
3. **/app:** The native Flutter mobile application, actively syncing to the dashboard's Kill Switch endpoints.
4. **/smart-metering-app:** Firmware deployed natively to ESP32 physical smart relays.

## ⚠️ Important Note on Interface Errors
If you interact with the Web Panel or App and receive an error when asking PrakashAI to control an appliance, **this is expected.** 

PrakashAI relies on bi-directional communication with our custom physical hardware controller. It will securely execute when connected to our grid. **[Please watch the demo video](https://youtu.be/GqRE9r5_pXY?si=2z1zpVS26iEn-mer)** to see how it operates in tandem with physical appliances!
