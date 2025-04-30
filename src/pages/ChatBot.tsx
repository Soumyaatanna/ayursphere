import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m AyurBot, your Ayurvedic wisdom assistant. You can ask me about Ayurvedic remedies, daily wellness tips, or just chat about how your day is going!',
    sender: 'bot',
    timestamp: new Date(),
  }
];

// Enhanced Ayurvedic knowledge base for the chatbot
const AYURVEDIC_KNOWLEDGE = [
  {
    keywords: ['turmeric', 'haldi'],
    response: "Turmeric (Haldi) is a powerful anti-inflammatory herb used in Ayurveda. It contains curcumin which helps with inflammation, digestive issues, and skin conditions. It's considered tridoshic, meaning it's beneficial for all doshas, though in excess it might aggravate Pitta. For daily use, try adding a pinch to warm milk with a little honey before bed."
  },
  {
    keywords: ['ginger', 'adrak'],
    response: "Ginger is a versatile Ayurvedic herb that improves digestion, reduces inflammation, and boosts immunity. It's particularly good for Vata and Kapha doshas but might increase Pitta if used excessively. For daily wellness, try starting your day with warm water infused with fresh ginger and lemon to stimulate digestion and cleanse the system."
  },
  {
    keywords: ['ashwagandha'],
    response: "Ashwagandha is an adaptogenic herb in Ayurveda that helps the body resist physiological and psychological stress. It's beneficial for balancing Vata and Kapha but might increase Pitta in some cases. For daily stress management, you can take ashwagandha powder (1/4-1/2 teaspoon) with warm milk before bedtime to promote restful sleep and reduce anxiety."
  },
  {
    keywords: ['tulsi', 'holy basil'],
    response: "Tulsi (Holy Basil) is known as the 'Queen of Herbs' in Ayurveda. It helps with respiratory conditions, stress, and immunity. It's good for balancing all three doshas. For daily immune support, try drinking 1-2 cups of tulsi tea throughout the day, especially during seasonal changes or when feeling under the weather."
  },
  {
    keywords: ['dosha', 'doshas', 'vata', 'pitta', 'kapha'],
    response: "Ayurveda classifies people into three main doshas (body types): Vata (air/space), Pitta (fire/water), and Kapha (earth/water). Each person has a unique combination of these doshas, which influences their physical characteristics, mental tendencies, and susceptibility to certain health issues. Understanding your dominant dosha can help you make lifestyle choices that maintain balance and prevent illness."
  },
  {
    keywords: ['cold', 'cough', 'flu', 'congestion'],
    response: "For colds and coughs in Ayurveda, try these remedies: 1) Ginger-Tulsi Tea: Boil fresh ginger, tulsi leaves, and a stick of cinnamon in water for 5 minutes. Add honey when cool. 2) Golden Milk: Mix 1/2 teaspoon turmeric and a pinch of black pepper in warm milk with honey. 3) For congestion: Steam inhalation with eucalyptus or ajwain. 4) Drink warm liquids and avoid cold foods and dairy during illness."
  },
  {
    keywords: ['sleep', 'insomnia', 'sleepless', 'trouble sleeping'],
    response: "Ayurvedic remedies for better sleep: 1) Establish a regular sleep routine, ideally in bed by 10pm. 2) Drink warm milk with a pinch of nutmeg or 1/2 teaspoon ashwagandha powder before bed. 3) Massage the soles of feet with warm sesame oil before sleeping. 4) Try a calming tea with chamomile, valerian root, or brahmi. 5) Avoid electronic devices 1-2 hours before bed to balance Vata dosha which causes restlessness."
  },
  {
    keywords: ['digest', 'digestion', 'stomach', 'gas', 'bloating', 'acidity'],
    response: "For digestive issues, Ayurveda suggests: 1) Sip CCF tea (cumin-coriander-fennel) after meals to reduce bloating and improve digestion. 2) Chew a piece of fresh ginger with a pinch of salt before meals. 3) For acidity, try 1/2 teaspoon of amla powder in water. 4) For constipation, have 1-2 teaspoons of triphala powder with warm water before bed. 5) Eat meals during Pitta time (noon) when digestive fire is strongest."
  },
  {
    keywords: ['stress', 'anxiety', 'relaxation', 'calm', 'peace'],
    response: "Ayurvedic approaches to stress management: 1) Practice pranayama (breathing exercises) like Anulom Vilom (alternate nostril breathing) for 5-10 minutes daily. 2) Take adaptogenic herbs like ashwagandha, brahmi, or shankhpushpi. 3) Apply warm sesame oil self-massage (abhyanga) for 15 minutes before showering. 4) Drink calming teas with holy basil, chamomile, or jatamansi. 5) Practice meditation focusing on the heart center for 10-15 minutes daily."
  },
  {
    keywords: ['skin', 'acne', 'rash', 'complexion', 'glow'],
    response: "For skin issues, Ayurveda recommends: 1) Neem and turmeric face pack: Mix neem powder, turmeric, and rose water to make a paste. Apply for 15 minutes then rinse. 2) For acne: Apply aloe vera gel directly on affected areas. 3) For skin glow: Mix equal parts of besan (gram flour) and yogurt with a pinch of turmeric for a weekly face mask. 4) Drink plenty of water and consume blood-purifying herbs like manjistha or neem regularly."
  },
  {
    keywords: ['weight', 'loss', 'obesity', 'diet'],
    response: "Ayurvedic approach to weight management: 1) Drink warm lemon water with honey and a pinch of cayenne pepper first thing in the morning. 2) Include bitter and astringent tastes in your diet (leafy greens, turmeric, fenugreek). 3) Use warming spices like black pepper, ginger, and cinnamon to boost metabolism. 4) Try triphala powder (1 tsp in warm water) before bed to cleanse the digestive system. 5) Practice moderate exercise appropriate for your dosha type, like brisk walking for Kapha types."
  },
  {
    keywords: ['hair', 'hair loss', 'dandruff', 'scalp'],
    response: "Ayurvedic remedies for hair health: 1) Bhringraj oil massage: Heat bhringraj oil and massage into scalp; leave overnight if possible. 2) For dandruff: Apply a paste of fenugreek seeds soaked overnight, leave for 30 minutes before washing. 3) For hair growth: Mix equal parts amla powder and brahmi powder with water, apply to scalp for 30 minutes before washing. 4) Consume amla (Indian gooseberry) regularly, either fresh or as powder in water."
  },
  {
    keywords: ['joint', 'pain', 'arthritis', 'inflammation'],
    response: "Ayurvedic remedies for joint pain: 1) Turmeric and ginger tea: Boil 1 tsp each of turmeric and ginger powder in water for 10 minutes; drink twice daily. 2) Castor oil massage: Warm castor oil and massage painful joints; wrap with warm cloth after. 3) Guggulu supplements may help reduce inflammation (consult a practitioner first). 4) Apply mahanarayan oil to affected areas before sleep. 5) Reduce Vata-aggravating foods like cold, dry, and raw foods."
  },
  {
    keywords: ['headache', 'migraine', 'head pain'],
    response: "For headaches, Ayurveda suggests: 1) Apply a paste of ginger powder and water to the forehead. 2) Massage the temples with warm brahmi oil or coconut oil. 3) For sinus headaches: Steam inhalation with eucalyptus or mint. 4) Drink coriander seed tea (1 tsp seeds boiled in water). 5) For Pitta-type headaches (with sensitivity to light/heat): Apply sandalwood paste to forehead and drink coconut water."
  },
  {
    keywords: ['diabetes', 'blood sugar'],
    response: "Ayurvedic support for managing blood sugar (alongside medical treatment): 1) Drink a decoction of 1 tsp methi (fenugreek) seeds soaked overnight in water. 2) Add 1/4 tsp cinnamon powder to meals or tea. 3) Consume bitter gourd (karela) juice on an empty stomach. 4) Take 1/2 tsp turmeric powder with 1/2 tsp amla powder in warm water before meals. 5) Include triphala in your routine. Always consult your doctor before making changes to your diabetes management routine."
  }
];

// Daily conversation topics
const DAILY_CONVERSATION = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! How are you feeling today? I'm here to chat about Ayurveda or just listen if you'd like to share about your day."
  },
  {
    keywords: ['how are you', 'how\'re you', 'how you doing'],
    response: "I'm functioning well, thank you for asking! As an Ayurvedic assistant, I'm here to help you find balance in your day. How are you feeling? Perhaps I can suggest some Ayurvedic practices based on your current state."
  },
  {
    keywords: ['good morning', 'morning'],
    response: "Good morning! According to Ayurveda, the morning hours (especially before sunrise) are considered the most sattvic time of day. Have you had a chance to drink some warm water with lemon? It's an excellent way to stimulate digestion and start your day in balance."
  },
  {
    keywords: ['good afternoon', 'afternoon'],
    response: "Good afternoon! This is Pitta time of day in Ayurveda, when your digestive fire is strongest. It's an ideal time for your main meal. How has your day been going so far?"
  },
  {
    keywords: ['good evening', 'evening'],
    response: "Good evening! As day transitions to night, Ayurveda recommends slowing down your activities to prepare for restful sleep. Have you been able to take some time to relax today?"
  },
  {
    keywords: ['good night', 'night'],
    response: "Good night! Ayurveda suggests being in bed before 10pm for the most restful sleep. A cup of warm milk with nutmeg can help calm the mind before sleeping. Rest well!"
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate'],
    response: "You're very welcome! It's my purpose to share Ayurvedic wisdom and help you on your wellness journey. Is there anything else I can assist you with today?"
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    response: "Farewell for now! Remember that balance in daily habits leads to long-term wellness according to Ayurveda. Feel free to chat again whenever you need guidance. Take care!"
  },
  {
    keywords: ['feeling', 'feel', 'tired', 'exhausted'],
    response: "I'm sorry to hear you're feeling tired. From an Ayurvedic perspective, this could be due to an imbalance in your doshas. Some quick energy boosters include: 1) A small piece of fresh ginger with a touch of honey, 2) A short 10-minute walk in fresh air, or 3) A few deep breathing exercises. Would you like specific instructions for any of these remedies?"
  },
  {
    keywords: ['happy', 'joy', 'good mood'],
    response: "That's wonderful to hear! In Ayurveda, a balanced state of mind creates harmony in the body. To maintain this positive state, you might enjoy some gentle yoga stretches or spending time in nature. Moments of joy are perfect times to practice gratitude, which Ayurveda recognizes as nourishing for the heart and mind."
  },
  {
    keywords: ['sad', 'unhappy', 'depressed', 'down'],
    response: "I'm sorry you're feeling this way. Ayurveda views emotional health as crucial to overall wellness. Some gentle suggestions are: 1) Breathing exercises focusing on long exhalations, 2) A warming cup of tulsi tea with honey, 3) A gentle self-massage with warm sesame oil on your feet. Remember that emotions naturally flow and change, just like the doshas. If these feelings persist, speaking with a healthcare professional is important."
  },
  {
    keywords: ['angry', 'frustrated', 'upset'],
    response: "When anger or frustration arises, Ayurveda sees this as potentially excess Pitta dosha. Cooling practices can help: 1) Take 10 slow, deep breaths, 2) Drink a glass of cool (not cold) water with a squeeze of lime, 3) If possible, take a short walk in nature. Expressing emotions in a constructive way is also important—perhaps journaling might help process these feelings."
  }
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    // Convert query to lowercase for case-insensitive matching
    const lowerQuery = query.toLowerCase();
    
    // First check for daily conversation matches
    for (const item of DAILY_CONVERSATION) {
      if (item.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return item.response;
      }
    }
    
    // Then check for Ayurvedic knowledge matches
    for (const item of AYURVEDIC_KNOWLEDGE) {
      if (item.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return item.response;
      }
    }
    
    // Check if query asks about specific remedies or general wellness
    if (lowerQuery.includes('remedy') || lowerQuery.includes('remedies') || 
        lowerQuery.includes('treatment') || lowerQuery.includes('cure') || 
        lowerQuery.includes('help with') || lowerQuery.includes('how to treat')) {
      
      // Extract possible health concerns from the query
      const healthConcerns = [
        { terms: ['cold', 'cough', 'flu', 'congestion'], index: 5 },
        { terms: ['sleep', 'insomnia', 'sleepless'], index: 6 },
        { terms: ['digest', 'stomach', 'gas', 'bloating', 'acidity'], index: 7 },
        { terms: ['stress', 'anxiety', 'worry', 'tension'], index: 8 },
        { terms: ['skin', 'acne', 'rash', 'complexion'], index: 9 },
        { terms: ['weight', 'obesity', 'diet', 'fat'], index: 10 },
        { terms: ['hair', 'dandruff', 'scalp', 'hairfall'], index: 11 },
        { terms: ['joint', 'pain', 'arthritis', 'inflammation'], index: 12 },
        { terms: ['headache', 'migraine', 'head pain'], index: 13 },
        { terms: ['diabetes', 'blood sugar'], index: 14 }
      ];
      
      for (const concern of healthConcerns) {
        if (concern.terms.some(term => lowerQuery.includes(term))) {
          return AYURVEDIC_KNOWLEDGE[concern.index].response;
        }
      }
    }
    
    // Default responses if no match is found
    const defaultResponses = [
      "I'm not sure about that specific topic in Ayurveda. Could you try asking something about common herbs like turmeric, ashwagandha, or principles like doshas? Or ask about specific health concerns like digestion, sleep, or stress management.",
      "That's an interesting question! While I have knowledge about basic Ayurvedic concepts and daily wellness, this specific query is beyond my current capabilities. Try asking about common herbs, remedies, or daily wellness practices.",
      "I don't have enough information about that specific query. In Ayurveda, it's always best to consult with a qualified practitioner for personalized advice. Would you like to know about some common Ayurvedic herbs or daily wellness practices instead?",
      "I'm still learning about the vast knowledge of Ayurveda. Could you phrase your question differently or ask about specific areas like digestion, sleep, stress management, or common Ayurvedic herbs?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateResponse(userMessage.content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages(INITIAL_MESSAGES);
    toast({
      title: "Conversation Reset",
      description: "The chat has been cleared and reset.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6">
        <div className="ayur-container max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-ayur-green rounded-full flex items-center justify-center">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">
                AyurBot Assistant
              </h1>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetConversation}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Chat
            </Button>
          </div>
          
          <Card className="border border-ayur-sage/30 mb-4">
            <CardContent className="p-4 h-[60vh] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`flex ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    } items-start gap-2 max-w-[80%]`}
                  >
                    <Avatar className={message.sender === 'user' ? 'bg-ayur-brown' : 'bg-ayur-green'}>
                      {message.sender === 'user' ? (
                        <>
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          <AvatarImage src="/placeholder.svg" />
                        </>
                      ) : (
                        <>
                          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                          <AvatarImage src="/placeholder.svg" />
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-ayur-brown text-white'
                          : 'bg-ayur-green/10 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex flex-row items-start gap-2 max-w-[80%]">
                    <Avatar className="bg-ayur-green">
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                      <AvatarImage src="/placeholder.svg" />
                    </Avatar>
                    <div className="bg-ayur-green/10 rounded-lg px-4 py-2 text-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-ayur-green animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-ayur-green animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-ayur-green animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>
          
          <div className="flex items-center gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ayurvedic remedies, daily wellness tips, or just say hello..."
              className="min-h-[60px] resize-none flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="h-[60px] px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>AyurBot provides general information based on Ayurvedic principles. This is not a substitute for professional medical advice or consultation with an Ayurvedic practitioner.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatBot;
