import {
  Button,
  Chip,
  ChipProps,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import Face2Icon from "@mui/icons-material/Face2"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import VisibilityIcon from "@mui/icons-material/Visibility"
import axios from "axios"
import Head from "next/head"
import { Root } from "src/utils/interfaces"
import { useRouter } from "next/router"
import queryString from "query-string"
import type { GetServerSidePropsContext } from "next"
import Link from "next/link"

const characterUrl = `https://rickandmortyapi.com/api/character`

const statusColor: { [key: string]: ChipProps["color"] } = {
  Alive: "success",
  Dead: "error"
}

export type HomeProps = Awaited<ReturnType<typeof getServerSideProps>>["props"]

export default function Home({ characters }: HomeProps) {
  const { query, replace, route } = useRouter()
  console.log(characters)
  return (
    <>
      <Head>
        <title>Arena Code Test</title>
        <meta name="description" content="Processo de seleção Hiago Maciel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/galinha1.png" />
      </Head>
      <Container sx={{ py: 2 }}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Rick and Morty
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button href="/" component={Link}>
              Limpar filtros
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Name"
              value={query?.name}
              onChange={(e) =>
                replace(
                  route + "?" + queryString.stringify({ ...query, name: e.target.value, page: 1 })
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={query?.status || ""}
                onChange={(e) =>
                  replace(
                    route +
                      "?" +
                      queryString.stringify({ ...query, status: e.target.value, page: 1 })
                  )
                }>
                <MenuItem value="alive">Alive</MenuItem>
                <MenuItem value="dead">Dead</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {characters?.results?.map((character) => (
            <Grid key={character?.id} item xs={12} md={6}>
              <Paper sx={{ overflow: "hidden" }}>
                <Stack direction="row" alignItems="stretch">
                  <img src={character?.image} alt="Avatar" style={{ height: 170 }} />
                  <Stack p={1} spacing={1} justifyContent="space-between">
                    <Typography variant="h6">{character?.name}</Typography>
                    <Chip
                      color={statusColor[character?.status]}
                      sx={{ width: "fit-content" }}
                      size="small"
                      label={character?.status}
                    />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Face2Icon titleAccess="Species" fontSize="small" />
                      <Typography variant="body2">{character?.species}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnIcon titleAccess="Last known location" fontSize="small" />
                      <Typography variant="body2">{character?.origin?.name}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <VisibilityIcon titleAccess="First seen in" fontSize="small" />
                      <Typography variant="body2">{character?.location?.name}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ mx: "auto", mt: 1, width: "fit-content" }}
          count={characters?.info?.pages}
          page={Number(query?.page || 1)}
          onChange={(_e, page) => replace(route + "?" + queryString.stringify({ ...query, page }))}
        />
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axios.get<Root>(characterUrl + "?" + queryString?.stringify(query))
  return { props: { characters: data } }
}
