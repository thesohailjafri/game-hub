import { Box, Grid, Show, GridItem, Wrap, WrapItem } from '@chakra-ui/react'
import GameGrid from '../components/GameGrid'
import GameHeading from '../components/GameHeading'
import GenreList from '../components/GenreList'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading />
          <Wrap
            marginBottom={5}
            spacing={5}
            // flex wrap
          >
            <WrapItem>
              <PlatformSelector />
            </WrapItem>
            <WrapItem>
              <SortSelector />
            </WrapItem>
          </Wrap>
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  )
}

export default HomePage
