const fetch = require('node-fetch');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const systemPrompt = `You are FlexHire AI Assistant - a helpful guide for a rural job marketplace platform.

**PLATFORM CONTEXT:**
- FlexHire connects job seekers with job providers
- Job Seekers: Browse jobs, apply, complete work, earn ratings
- Job Providers: Post jobs, hire workers, make payments, rate workers
- Payment System: Providers pay workers for completed jobs (5-star rating = 50 credits)
- Ratings: 5-star system, credits awarded per star
- Categories: Construction, Agriculture, Services, Repairs, Delivery

**YOUR ROLE:**
1. Answer FlexHire-specific questions about:
   - How to post/browse jobs
   - Payment and rating process
   - Worker/Provider features
   - Blog and portfolio usage
   
2. Provide general help on:
   - Platform navigation
   - Account management
   - Best practices for earning/hiring
   - General questions about anything (within reason)

**RESPONSE GUIDELINES:**
- Keep responses concise (2-3 sentences max)
- Use Hinglish when appropriate (mix Hindi-English)
- Include relevant emojis
- If query is unclear, ask for clarification
- Be helpful and friendly
- Prioritize FlexHire guidance for platform queries`;

const handleAIChat = async (req, res) => {
  try {
    const { message, userType, userId } = req.body;

    if (!message) {
      return res.json({
        success: false,
        error: 'Message is required'
      });
    }

    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured in .env');
      return res.json({
        success: false,
        error: 'AI service not configured. Please add OPENAI_API_KEY to backend .env file'
      });
    }

    // Add user context to the message
    const userContext = userType === 'jobProvider' 
      ? '[User is a Job Provider]' 
      : userType === 'jobSeeker' 
      ? '[User is a Job Seeker]'
      : '[User type unknown]';

    console.log('Sending request to OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `${userContext}\n\n${message}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    console.log('OpenAI API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return res.json({
        success: false,
        error: `OpenAI Error (${response.status}): ${errorData.error?.message || 'Unknown error'}`
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'No response from AI';

    console.log('AI Response received successfully');

    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('Chat Error:', error.message);
    res.json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

module.exports = { handleAIChat };

