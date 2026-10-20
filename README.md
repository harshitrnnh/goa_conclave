# Many Minds One Tomorrow · Goa Conclave Computational Artwork & Tablet Kiosk

A live, dynamic computational point cloud artwork built for a vertical screen (16:9 vertical ratio / 9:16 portrait) responding continuously to attendee sentiment collected via a companion tablet web app or smartphone QR code.

Inspired by traditional Goan laterite stone, Kaavi dot-painting, Mandovi river currents, and Goan culinary metaphors.

---

## 🎨 System Overview

1. **Vertical Screen Computational Artwork (`?mode=screen` or `?mode=wall`)**:
   - **Aspect Ratio**: 16:9 vertical (9:16 portrait, 1080×1920 logical canvas coordinates).
   - **Point Cloud Simulation**: 42,000+ dynamic particles running smoothly at 60 FPS using an optimized canvas sprite pipeline.
   - **Organic Movement**: Subtle, living particle movement along pseudo-Perlin fluid flow streamlines, solar corona orbits, harmonic breathing, and river wave currents.
   - **QR Code at Bottom**: Neatly embedded QR code displaying the tablet web app URL. Scanning with any smartphone or clicking opens the survey instantly.
   - **Live Influx Feedback**: When any attendee submits an answer from their phone or the tablet, a flurry of glowing particles in their chosen Goan palette rises from the bottom and weaves into the live tapestry.
   - **Ephemeral Top Dish Constellation ("Once in a while")**: Every ~50 seconds (or triggered on demand with the **T** key or **"Form Top Dish"** button), thousands of particles smoothly assemble into the recognizable point-cloud constellation of the **top voted Goan dish** of that session (Fish Curry, Vindaloo, Bebinca, Prawn Curry, Xacuti, or Poe Bread), glowing with a golden halo and title banner, holding for 7.5 seconds before dissolving back into the flowing river currents!

2. **30-Minute Cycle & Sentiment Synthesis Engine**:
   - The artwork continuously collects votes and every **30 minutes** smoothly morphs into a new visual synthesis reflecting the audience sentiment of that 30-minute block.
   - **Weather Question Impact**:
     - *Sunny & Energetic* → Intense golden solar radiance, expansive corona, higher particle velocity.
     - *Windy & Restless* → Fast diagonal sweeps, dynamic eddies and dispersal.
     - *Rainy & Reflective* → Cascading vertical ribbons, monsoon slate and teal undertones.
     - *Stormy & Eclectic* → Tight angular vortices, turbulence, fiery embers and contrast.
     - *Calm & Serene* → Rhythmic undulating harmonics, low noise, peaceful sand and terracotta balance.
   - **Goan Food Metaphor Impact**:
     - *Fish Curry (Bold & Transformative)* → Deep golden turmeric ochre and Arabian Sea emerald accents.
     - *Prawn Curry (Warm & Exciting)* → Warm saffron coral and terracotta glow.
     - *Vindaloo (Spicy & Intense)* → Deep chili crimson and glowing spark embers.
     - *Xacuti (Rich & Layered)* → Complex roasted spice umbers and coconut peppercorn speckles.
     - *Bebinca (Sweet & Optimistic)* → 7 caramelized strata layers in jaggery gold and toasted ghee brown.
     - *Poe Bread (Simple & Comforting)* → Rustic crust browns and comforting flour ivory dots.

3. **Tablet Kiosk & Mobile Web App (`?mode=tablet`)**:
   - Replicates the exact tablet interface shown in the reference photo.
   - Authentic Goan architectural terracotta frieze border along top and bottom.
   - Warm parchment background with serif typography.
   - **Question 1**: *"What did the previous session of the Conclave feel like in terms of the weather of Goa?"* (Sunny, Windy, Rainy, Stormy, Calm).
   - **Question 2**: *"How do you feel about AI in terms of Goan foods?"* (Fish Curry, Prawn Curry, Vindaloo, Xacuti, Bebinca, Poe Bread).
   - **Step 3**: Optional attendee name/org and 1-line reflection.
   - **Step 4**: Celebratory visual mandala and auto-reset timer (15s) so the tablet is immediately ready for the next attendee in line.

4. **"Past Sessions" Gallery & "Sentiment to Swag"**:
   - Historical carousel showing past 30-minute generated artworks.
   - Detailed sentiment breakdown modal with percentage bars.
   - **"Download Sentiment to Swag Postcard"** feature generating a high-res souvenir card for attendees!

5. **Multi-View Presentation Modes**:
   - **Pillar Installation View (`?mode=wall`)**: Matches the physical photo with the architectural pillar, "Many Minds One Tomorrow" poem, and framed vertical display.
   - **Pure 16:9 Vertical Screen (`?mode=screen`)**: Fullscreen borderless canvas for dedicated 65" vertical TV / kiosk.
   - **Tablet Kiosk View (`?mode=tablet`)**: Touch kiosk layout for tablet beside screen.
   - **Side-by-Side Dual View (`?mode=dual`)**: Split-screen showing vertical artwork on the left and tablet on the right.

---

## 🚀 Running the Application

```bash
# Start the server (Node.js with Express + WebSocket)
npm start
```

### Access URLs:
- **Pillar Installation View**: `http://localhost:3000/?mode=wall`
- **Vertical Screen (16:9 Vertical)**: `http://localhost:3000/?mode=screen`
- **Tablet Kiosk**: `http://localhost:3000/?mode=tablet`
- **Side-by-Side Dual View**: `http://localhost:3000/?mode=dual`
- **Network Mobile Access**: `http://<YOUR_LOCAL_IP>:3000/?mode=tablet` (displayed automatically on the QR code)

### ⌨️ Presentation Keyboard Shortcuts:
- `D`: Toggle presenter controls tray
- `F`: Toggle Fullscreen mode
- `T`: Morph particles into the session's top Goan dish constellation
- `E` or `Space`: Evolve 30-min cycle immediately (triggers morph & archives session)
- `M`: Inject +5 simulated crowd votes
