import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightCardProps } from "@/types/Insight";

const InsightsList = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InsightCard
        title="💡 Best Performing Month"
        color="hsl(142 71% 45%)"
        content="Highest application volume with 18 applications and 5 interviews"
        value="March 2024"
      />
      <InsightCard
        title="⚡ Quick Tip"
        color="hsl(38 92% 50%)"
        content="Companies in the Technology sector respond 40% faster than average. 
                  Focus your efforts there for quicker feedback."
      />
      <InsightCard
        title="📈 Trend Alert"
        color="hsl(199 89% 58%)"
        content="Your interview conversion rate has improved by 25% over the last 3 months. 
                  Keep up the great work!"
      />
    </div>
  );
};

export default InsightsList;

const InsightCard = ({ title, color, content, value }: InsightCardProps) => {
  return (
    <Card style={{ borderLeftColor: color }} className="border-l-4">
      <CardHeader>
        <CardTitle style={{ color: color }}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {value && <p className="text-2xl font-bold">{value}</p>}
        <p className={`text-sm ${value ? "text-muted-foreground" : ""}`}>
          {content}
        </p>
      </CardContent>
    </Card>
  );
};
