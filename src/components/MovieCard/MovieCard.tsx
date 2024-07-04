import { Card, CardBody, Text, Image, Stack, Heading } from "@chakra-ui/react";
import { MovieBasic } from "../../lib/shared/types";
import React from "react";

type MovieCardProps = {
  movie: MovieBasic;
  children?: React.ReactNode;
};

const MovieCard = ({ movie, children }: MovieCardProps) => {
  return (
    <Card
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      _hover={{ transform: "scale(1.03)" }}
    >
      {movie.Poster !== "N/A" && (
        <Image
          src={movie.Poster}
          alt={movie.Title}
          objectFit="cover"
          width="100%"
          height="80%"
        />
      )}

      <CardBody>
        <Stack spacing="3">
          <Heading
            size="md"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            {movie.Title} {children}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {movie.Year}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
