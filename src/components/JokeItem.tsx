import { useState } from "react";
import { Card, CardContent, Typography, Button, Collapse } from "@mui/material";
import { Joke } from "../services/api";

interface JokeItemProps {
  joke: Joke;
}

export function JokeItem({ joke }: JokeItemProps) {
  const [showPunchline, setShowPunchline] = useState(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {joke.setup}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowPunchline(!showPunchline)}
          sx={{ mb: 1 }}
        >
          {showPunchline ? "Hide Punchline" : "Show Punchline"}
        </Button>
        <Collapse in={showPunchline}>
          <Typography variant="body1" color="primary">
            {joke.punchline}
          </Typography>
        </Collapse>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Type: {joke.type}
        </Typography>
      </CardContent>
    </Card>
  );
}
