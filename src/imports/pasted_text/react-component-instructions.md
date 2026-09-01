You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
card-12.tsx
import * as React from 'react';
import { Mail, CalendarDays, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Define the types for the props for strong typing and reusability
interface UserProfile {
  name: string;
  avatarUrl: string;
  company: string;
  location: string;
}

export interface OpportunityCardProps {
  status: string;
  postedBy: UserProfile;
  salaryRange: {
    min: number;
    max: number;
  };
  deadline: string;
  matchPercentage: number;
  rating: number;
  tags: string[];
  description: string;
  recruiter: UserProfile;
  onAccept: () => void;
  onDecline: () => void;
  className?: string;
}

const OpportunityCard = React.forwardRef<HTMLDivElement, OpportunityCardProps>(
  (
    {
      status,
      postedBy,
      salaryRange,
      deadline,
      matchPercentage,
      rating,
      tags,
      description,
      recruiter,
      onAccept,
      onDecline,
      className,
    },
    ref
  ) => {
    // Helper to format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    // Animation variants for Framer Motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm font-sans',
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold text-lg">New Opportunity</h2>
          </div>
          <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">{status}</Badge>
        </div>

        <hr className="my-4 border-border" />

        {/* Main Job Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={postedBy.avatarUrl} alt={postedBy.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="font-medium">{postedBy.name}</p>
              <p className="text-sm text-muted-foreground">
                {postedBy.company} &bull; {postedBy.location}
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight">
            {formatCurrency(salaryRange.min)} - {formatCurrency(salaryRange.max)}
          </h3>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">{matchPercentage}% Match</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800">
              <Star className="mr-1.5 h-3.5 w-3.5 fill-current" />
              {rating}
            </Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80">{tag}</Badge>
            ))}
             <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800">
              Responsive
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        {/* Recruiter Info */}
        <div className="mt-6 flex items-center gap-3">
          <img src={recruiter.avatarUrl} alt={recruiter.name} className="h-8 w-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium">{recruiter.name}</p>
            <p className="text-xs text-muted-foreground">
              {recruiter.company} &bull; {recruiter.location}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button onClick={onAccept} className="w-full" size="lg">Accept Project</Button>
          <Button onClick={onDecline} variant="outline" className="w-full" size="lg">Decline Offer</Button>
        </div>
      </motion.div>
    );
  }
);

OpportunityCard.displayName = 'OpportunityCard';

export { OpportunityCard };

demo.tsx
import { OpportunityCard, OpportunityCardProps } from '@/components/ui/card-12';

const Demo = () => {
  // Sample data to populate the card
  const opportunityData: Omit<OpportunityCardProps, 'onAccept' | 'onDecline'> = {
    status: 'Available',
    postedBy: {
      name: 'Jenifer A.',
      avatarUrl: 'https://i.pravatar.cc/150?u=jenifer',
      company: 'Meta — Facebook',
      location: 'California',
    },
    salaryRange: {
      min: 35000,
      max: 45000,
    },
    deadline: '14 Oct - 2024',
    matchPercentage: 89.5,
    rating: 4.9,
    tags: ['Web Design'],
    description: 'Need Responsive Website showcase product. Modern and visually appealing design.',
    recruiter: {
      name: 'Robert T.',
      avatarUrl: 'https://i.pravatar.cc/150?u=robert',
      company: 'Full Cycle Agency',
      location: 'Salt Lake',
    },
  };

  // Handler functions for the buttons
  const handleAccept = () => {
    console.log('Project Accepted!');
    // Add your accept logic here
  };

  const handleDecline = () => {
    console.log('Offer Declined.');
    // Add your decline logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <OpportunityCard
        {...opportunityData}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
originui/button
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

Install NPM dependencies:
```bash
lucide-react, framer-motion, @radix-ui/react-slot, class-variance-authority
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
