# Beam Landing Page

A modern, responsive landing page for the Beam mobile communication app built with Next.js, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Modern Design**: Clean, professional design matching the Beam mobile app's green color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Waitlist Signup**: Functional email collection system for early access
- **Dark Mode Support**: Automatic dark/light mode switching based on system preferences
- **Animations**: Smooth animations and transitions for better user experience
- **SEO Optimized**: Proper metadata and Open Graph tags for social sharing
- **Type Safe**: Built with TypeScript for better development experience

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations (ready to use)

## 🎨 Design System

The design follows the Beam mobile app's visual identity:
- **Primary Color**: Green (#22c55e / hsl(142 76% 36%))
- **Font**: Schibsted Grotesk - Modern, clean typography
- **Layout**: Clean, minimal design with focus on the waitlist CTA
- **Components**: Glass-morphism effects and modern card designs

## 📦 Installation

1. Navigate to the beam.me directory:
```bash
cd beam.me
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

To add new shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

## 📊 Waitlist API

The landing page includes a simple API endpoint for collecting emails:

**Endpoint**: `POST /api/waitlist`

**Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully added to waitlist!"
}
```

### Extending the Waitlist

To integrate with external services, modify `/src/app/api/waitlist/route.ts`:

- **Database**: Add database integration (Prisma, MongoDB, etc.)
- **Email Service**: Integrate with Mailchimp, ConvertKit, or SendGrid
- **Analytics**: Track signups with Google Analytics or similar
- **Notifications**: Send confirmation emails to users

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Mobile App Integration

This landing page is designed to complement the Beam mobile app. The design language and branding are consistent with:
- Green color scheme matching the mobile app
- Schibsted Grotesk typography
- Material Design 3 inspired components
- Focus on communication and connectivity features

## 🔄 Future Enhancements

- [ ] Add more interactive animations
- [ ] Implement email verification
- [ ] Add social media integration
- [ ] Create admin dashboard for waitlist management
- [ ] Add A/B testing capabilities
- [ ] Implement analytics tracking
- [ ] Add multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the Beam communication platform.

---

Built with ❤️ for the Beam community
