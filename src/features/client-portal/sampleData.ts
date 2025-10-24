import { PersonalizedCardData } from './PersonalizedCard'
import { HomeworkChecklistData } from './HomeworkChecklist'
import { getAudioTrack } from '@/content/media/audioTracks'
import { getSoundCloudTrack } from '@/content/media/soundcloudTracks'

const transitionMeditationTrack = getAudioTrack('transitionMeditation')
const confidenceSmallWinsTrack = getAudioTrack('confidenceSmallWins')
const sweetSteepTrack = getSoundCloudTrack('sweetSweetSteep')

export const samplePersonalizedCards: ReadonlyArray<PersonalizedCardData> = [
  {
    id: '1',
    title: 'Weekly Reflection Exercise',
    subtitle: 'Mindfulness and Self-Discovery',
    description: 'A guided reflection exercise to help you process this week\'s experiences and identify patterns in your emotional responses.',
    content: `**Welcome to Your Weekly Reflection**

Take a moment to center yourself and reflect on the week that has passed. This exercise is designed to help you:

- Process your experiences
- Identify emotional patterns
- Celebrate your growth
- Set intentions for the coming week

**Reflection Questions:**

1. **What were three significant moments from this week?**
   Take time to really think about moments that stood out - both positive and challenging.

2. **How did you respond to stress or challenges?**
   Notice your patterns without judgment. What worked well? What could be improved?

3. **What are you most grateful for from this week?**
   Gratitude helps shift our perspective and builds resilience.

4. **What would you like to focus on next week?**
   Set one small, achievable intention for yourself.

*Remember: There are no right or wrong answers. This is your space for honest self-reflection.*

**Your Progress:** You've completed 3 out of 4 weekly reflections this month. Keep up the great work!`,
    type: 'reflection',
    createdDate: '2024-02-20',
    progress: '3/4 completed this month',
    mediaUrl: undefined,
    mediaType: undefined,
    mediaDuration: undefined
  },
  {
    id: '2',
    title: 'Building Confidence Through Small Wins',
    subtitle: 'Personal Development Exercise',
    description: 'Discover how celebrating small victories can build lasting self-confidence and create positive momentum in your personal growth journey.',
    content: `**Understanding Small Wins**

Confidence isn't built overnight - it's constructed through consistent, small victories that prove to ourselves what we're capable of achieving.

**Why Small Wins Matter:**

- They create positive momentum
- Build neural pathways associated with success
- Make larger goals feel more achievable
- Provide regular opportunities for celebration

**This Week's Exercise:**

**Daily Practice:** Each day, identify and celebrate ONE small win. It could be:
- Making your bed
- Drinking enough water
- Having a difficult conversation
- Completing a task you've been putting off
- Practicing self-compassion in a challenging moment

**How to Practice:**
1. **Notice the win** - Be present when you accomplish something
2. **Acknowledge it** - Say "I did that" or "That was good work"
3. **Feel it** - Let yourself experience the positive feeling
4. **Record it** - Write it down or share it with someone

**Your Personal Challenge:**
This week, focus on confidence in social situations. Practice one small confident behavior each day - it could be making eye contact, speaking up in a meeting, or simply walking with good posture.

*Remember: Every expert was once a beginner. Every confident person had to start somewhere.*`,
    type: 'exercise',
    createdDate: '2024-02-18',
    progress: 'Day 3 of 7',
    mediaUrl: undefined,
    mediaType: undefined,
    mediaDuration: undefined
  },
  {
    id: '3',
    title: 'Guided Meditation: Finding Inner Peace',
    subtitle: 'A calming 10-minute guided meditation',
    description: 'This peaceful guided meditation will help you center yourself, release tension, and connect with your inner calm. Perfect for daily practice.',
    content: `**Welcome to Your Guided Meditation Practice**

This 10-minute guided meditation is designed to help you find your center and cultivate inner peace in your daily life.

**What You'll Experience:**

- **Breathing exercises** to calm your nervous system
- **Body awareness** to release physical tension
- **Mindfulness techniques** to quiet mental chatter
- **Visualization** to connect with your inner wisdom

**How to Practice:**

1. **Find a quiet space** where you won't be interrupted
2. **Sit comfortably** in a chair or on a cushion
3. **Close your eyes** or soften your gaze
4. **Press play** and let my voice guide you

**After Your Practice:**

Take a moment to notice how you feel. You might experience:
- A sense of calm and clarity
- Reduced physical tension
- Mental spaciousness
- Emotional balance

**Remember:** There's no "perfect" way to meditate. Simply showing up for yourself is enough.

*This recording was created specifically for you as part of our therapeutic work together. I encourage you to return to it whenever you need to reconnect with your center.*`,
    type: 'audio',
    createdDate: '2024-02-22',
    mediaUrl: transitionMeditationTrack.src,
    mediaType: 'audio',
    mediaDuration: transitionMeditationTrack.duration,
    progress: 'New session available'
  },
  {
    id: '4',
    title: 'Weekly Check-in: Stress Management Techniques',
    subtitle: 'Personal audio message from your coach',
    description: 'A personalized audio message addressing your recent stress patterns and offering tailored coping strategies for the week ahead.',
    content: `**Personal Audio Message - Week of February 19th**

Hello! This is your personalized audio check-in for this week.

**What We'll Cover:**

I've noticed from our recent sessions that you've been experiencing increased stress around work deadlines. In this recording, I share:

**Specific Strategies for You:**
- The "5-4-3-2-1" grounding technique we practiced
- How to use your lunch breaks more effectively
- Setting boundaries with colleagues (without guilt!)
- Your personalized stress signals to watch for

**This Week's Focus:**
Based on our last conversation, I want you to pay special attention to:
- The physical sensations you feel when stress begins to build
- The stories you tell yourself about "not being enough"
- Opportunities to practice the breathing technique we learned

**Your Homework:**
1. **Practice the 4-7-8 breathing** at least once daily
2. **Use your stress journal** - even just one sentence per day
3. **Set one small boundary** at work this week

**Remember:** You've already made so much progress. The tools are working - trust yourself to use them.

*I'm here to support you every step of the way. Feel free to reach out if you need anything before our next session.*

With encouragement,
Your Therapeutic Coach`,
    type: 'audio',
    createdDate: '2024-02-19',
    mediaUrl: confidenceSmallWinsTrack.src,
    mediaType: 'audio',
    mediaDuration: confidenceSmallWinsTrack.duration,
    progress: 'Personal message for you'
  }
  ,
  {
    id: '5',
    title: 'Meditation: Sweet Sweet Steep',
    subtitle: 'SoundCloud guided meditation example',
    description: 'A restorative meditation practice hosted on SoundCloud to demonstrate embedding external audio within the reusable player flow.',
    content: `**How to Listen**

This meditation is streamed directly from SoundCloud using the reusable audio components.

**Before you begin:**
- Find a comfortable seated position
- Silence notifications
- Take a few grounding breaths

**During the practice:**
- Follow the gentle cues
- Allow yourself to relax without expectations
- Return to the breath if your mind wanders

**After the recording:**
- Note one word that describes how you feel
- Jot down any insights that emerged
- Schedule a reminder to revisit this practice this week

*This card demonstrates how future SoundCloud tracks can be added without creating new components—simply register the track once and reference it here.*`,
    type: 'audio',
    createdDate: '2024-10-10',
    mediaUrl: sweetSteepTrack.embedUrl,
    mediaType: 'soundcloud',
    mediaDuration: undefined,
    progress: 'Streamed via SoundCloud',
    mediaOptions: {
      soundcloudTrack: sweetSteepTrack.key,
    },
  }
] as const

export const sampleHomeworkChecklists: ReadonlyArray<HomeworkChecklistData> = [
  {
    id: 'hw-1',
    title: 'Weekly Self-Care Routine',
    subtitle: 'Building Sustainable Habits',
    description: 'Complete these self-care activities throughout the week to establish a sustainable routine that supports your mental and emotional well-being.',
    dueDate: '2024-02-28',
    createdDate: '2024-02-21',
    items: [
      {
        id: 'sc-1',
        title: 'Practice 10-minute morning meditation',
        description: 'Use the guided meditation from your audio session',
        completed: true
      },
      {
        id: 'sc-2', 
        title: 'Write in your gratitude journal',
        description: 'List 3 things you\'re grateful for each day',
        completed: true
      },
      {
        id: 'sc-3',
        title: 'Take a 20-minute walk outside',
        description: 'Fresh air and movement to boost your mood',
        completed: false
      },
      {
        id: 'sc-4',
        title: 'Practice the 4-7-8 breathing technique',
        description: 'Use this when you feel stress building up',
        completed: false
      },
      {
        id: 'sc-5',
        title: 'Set one healthy boundary',
        description: 'Say no to something that doesn\'t serve you',
        completed: false
      }
    ]
  },
  {
    id: 'hw-2',
    title: 'Confidence Building Challenges',
    subtitle: 'Small Steps to Big Changes',
    description: 'Daily micro-challenges designed to build your confidence through small, achievable actions.',
    dueDate: '2024-02-25',
    createdDate: '2024-02-18',
    items: [
      {
        id: 'cb-1',
        title: 'Make eye contact during conversations',
        description: 'Practice confident body language in at least 3 conversations',
        completed: true
      },
      {
        id: 'cb-2',
        title: 'Speak up in a meeting or group setting',
        description: 'Share one idea or ask one question',
        completed: true
      },
      {
        id: 'cb-3',
        title: 'Compliment someone genuinely',
        description: 'Practice positive interaction and connection',
        completed: true
      },
      {
        id: 'cb-4',
        title: 'Wear something that makes you feel good',
        description: 'Choose clothes that boost your confidence',
        completed: false
      },
      {
        id: 'cb-5',
        title: 'Record one small win in your journal',
        description: 'Document your progress and celebrate achievements',
        completed: false
      },
      {
        id: 'cb-6',
        title: 'Try something slightly outside your comfort zone',
        description: 'Take one small step toward growth',
        completed: false
      }
    ]
  },
  {
    id: 'hw-3',
    title: 'Stress Management Toolkit',
    subtitle: 'Techniques for Difficult Moments',
    description: 'Practice these coping strategies when you encounter stressful situations this week.',
    dueDate: '2024-02-26',
    createdDate: '2024-02-19',
    items: [
      {
        id: 'sm-1',
        title: 'Use the 5-4-3-2-1 grounding technique',
        description: '5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
        completed: false
      },
      {
        id: 'sm-2',
        title: 'Take three conscious deep breaths',
        description: 'Pause and breathe when you notice stress building',
        completed: false
      },
      {
        id: 'sm-3',
        title: 'Write down your worried thoughts',
        description: 'Get them out of your head and onto paper',
        completed: false
      },
      {
        id: 'sm-4',
        title: 'Ask yourself: "Will this matter in 5 years?"',
        description: 'Put current stressors in perspective',
        completed: false
      }
    ]
  }
] as const
