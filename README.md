HerShield
Where Courage Travels With You.

HerShield is an AI-powered smart journey protection platform designed to enhance women's safety during travel. The system monitors journeys in real time, detects potential risks using intelligent monitoring, and automatically alerts trusted contacts and authorities when necessary.

The platform integrates location intelligence, voice detection, automated SOS escalation, and smart route safety analysis to provide continuous protection from the beginning of a journey to its safe completion.

Problem Statement

Women travelling through public transportation such as taxis, buses, and shared mobility services often face safety risks due to the absence of intelligent monitoring and rapid emergency response systems.

Existing safety solutions depend heavily on manual actions, such as sharing location or pressing a panic button. These solutions are reactive and may fail during critical situations where the user cannot interact with their phone.

There is a need for a smart, automated safety system that continuously monitors journeys, detects abnormal situations, and triggers emergency responses without requiring manual intervention.

HerShield addresses this gap by providing proactive journey monitoring, voice-based distress detection, route safety evaluation, and automated SOS escalation.

Key Features
1. Smart Journey Check-In

Passengers verify ride details before starting the journey.

Includes:

vehicle number verification
driver authentication
destination confirmation

This ensures the system begins monitoring only after the ride is verified.

2. Safest Route Recommendation

The system calculates the safest available route using safety indicators such as:

traffic density
area safety level
time of day
route activity

Routes are classified as:

Green — Safe
Yellow — Moderate Risk
Red — Risky
3. Real-Time Journey Monitoring

During travel, HerShield continuously tracks:

GPS location
route deviation
ride duration
unexpected stops
speed patterns

This enables automatic detection of unusual travel behavior.

4. Voice-Based Distress Detection

The application monitors for emergency indicators such as:

distress keywords
scream detection

If detected, the system automatically activates safety alerts.

5. Automatic SOS Activation

SOS can be triggered through:

manual emergency button
distress voice detection
user inactivity or phone shutdown

Once triggered, emergency protocols activate immediately.

6. Live Location Sharing

When SOS is activated:

trusted contacts receive the user's live location
a tracking link is generated
real-time updates are shared continuously
7. Admin Safety Dashboard

Authorities or safety administrators can monitor alerts through a centralized dashboard displaying:

active SOS alerts
user location
ride details
emergency status

This enables rapid emergency response.

System Architecture

HerShield follows a multi-layer smart safety architecture.

Layer 1 – Mobile Application

Handles user interaction.

Functions:

login and authentication
journey check-in
live tracking
SOS activation
voice monitoring
Layer 2 – Safety Monitoring Engine

Processes journey data and detects risk events.

Includes:

route deviation detection
suspicious stop detection
safety prompts
inactivity monitoring
Layer 3 – Backend Services

Handles system operations.

Functions:

ride management
notification processing
voice data analysis
alert management
Layer 4 – Data Storage

Stores system data.

Includes:

user profiles
ride history
location logs
emergency alerts
Layer 5 – Authority Monitoring Dashboard

Provides monitoring tools for safety authorities.

Features:

live map tracking
alert monitoring
user ride information
Technology Stack
Component	Technology
Mobile App	React Native / Flutter
Backend	Node.js + Express
Database	PostgreSQL
Authentication	Firebase Authentication
Maps & Navigation	Google Maps API
Real-Time Tracking	WebSockets / Socket.io
Notifications	Firebase Cloud Messaging
SMS & Emergency Calls	Twilio API
Voice Detection	TensorFlow Lite
Admin Dashboard	React.js
Cloud Infrastructure	AWS / Google Cloud
Innovation Highlights

HerShield introduces several innovations beyond traditional safety apps.

Proactive Safety Monitoring
Unlike basic panic button apps, HerShield continuously analyzes travel behavior.

Voice-Based Emergency Detection
Distress keywords and scream patterns can automatically trigger alerts.

Smart Route Safety Evaluation
Routes are evaluated based on safety indicators, not just travel time.

Automated SOS Escalation
Emergency alerts activate automatically when risk is detected.

Authority Integration
Safety dashboards allow real-time monitoring by authorities.

Market Gap
Existing Safety Apps	HerShield
Reactive panic button systems	Proactive AI safety monitoring
Manual location sharing	Automatic live tracking
Limited driver verification	Smart ride check-in system
No route safety analysis	AI-based safe route evaluation
Slow emergency response	Instant SOS escalation
Use Cases

HerShield can be used in:

public transport safety systems
ride-sharing platforms
smart city mobility infrastructure
university campus safety
corporate employee transport services
Project Impact

HerShield contributes to safer urban mobility by providing:

continuous journey protection
faster emergency response
increased confidence in public transport
improved safety infrastructure in smart cities
Scalability

The system is designed to support large-scale deployments.

Cloud infrastructure enables:

support for millions of users
multi-city deployment
integration with government safety networks
Future Scope

HerShield can evolve into a large-scale urban safety ecosystem with features such as:

AI crime prediction using city data
integration with CCTV surveillance systems
wearable emergency devices
integration with public transport databases
direct connection with emergency response systems
License

This project is released under the MIT License.

Contributors

Team TheFouriers

Building technology that ensures every journey ends safely.
