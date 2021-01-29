import React from "react";
import SEO from "../components/SEO";
import { Container, Typography, Box, Divider } from "@material-ui/core";
import Link from "../components/Link";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <SEO title={"About"} />
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="body1" component="span">
          <Box fontStyle="italic" fontWeight={500} mt={3}>
            The purpose of this explorer is to provide a tool evaluate the use
            temperature as the unit for setting climate targets, be it at the
            local or national level, or for a company or organisation. This
            makes it possible to set targets in relation to the total climate
            effect of cumulative carbon emissions (carbon budgets) and non-CO2
            green-house gases (GHGs), also named climate pollutants (CP), such
            as nitrous oxide or methane. The commonly used CO2‑equivalent metric
            calculated using GWP can often be misleading, this tool let the user
            explore other options. The explorer also visualize the different
            dynamics of climate pollutants effect on temperature. We hope to
            extend the explorer with more than the existing model in the near
            future thus enabling comparison between different metrics or models
            as well.
          </Box>
          <p>
            Today, many levels of government as well as organisations have
            climate targets in terms of CO2 or CO2-equivalent emissions for
            point years in the future, e.g. 2030 or 2045. This is a remnant of
            how climate targets were framed by the Intergovernmental Panel on
            Climate Change (IPCC) in Assessment Report 4, AR 4, and earlier(1,
            2). However, with the AR 5 and the introduction of the global carbon
            budget this changed. It was concluded that there is a close to
            linear relationship between cumulative CO2 emissions and temperature
            increase. In the 2015 Paris agreement, the framing was further
            shifted toward setting temperate targets by including all GHGs
            contributions. Point year targets are imprecise, at the best, in
            terms of what the contribution to climate change will be at the year
            in question since the pathway of emissions need to be taken into
            account.
          </p>
          <p>
            This impreciseness can be further aggravated when actors try to
            combine different GHGs into CO2-equivalents using the metric global
            warming potential (GWP). A wealth of literature exists on when, when
            not and why GWP can be misleading for decision makers. The main
            issue is that climate change is the result of cumulative emissions,
            year after year, and a poor representation of the dynamics of the
            different GHGs often lead to an exaggeration of short-lived gases´
            climate change impact. A number of different ways of calculating
            CO2-equivalents, instead of using the GWP metric, have therefore
            been suggested, some of which we are hoping to include in this tool.
          </p>
          <p>
            In spite of advances in the field, practices have generally not been
            changed. For examples, life cycle analysis often present results
            only in CO2-equivalents calculated using GWP, and countries set
            targets for point years, e.g. 2030 or 2050. One change in practices
            however is the use of carbon budgets. Most recently, Norway adopted
            a kind of national carbon budget target. In Sweden and the UK many
            cities and municipalities are exploring the use of a carbon budget
            methodology(3) and the Science Based Target network has recently
            also recommended this methodology.
          </p>
          <p>
            Setting targets for the cumulative amount of carbon emissions covers
            the major part of the climate impact. However, for certain actors,
            other GHGs might play a bigger role, or be of special interest. In
            this case, targets could possibly be set in terms of temperature
            contribution, or alternatively, warming effect (so called radiative
            forcing, not included yet in the explorer).
          </p>
          <p>
            Setting climate targets in relation to temperature increase would be
            to set targets as close to the resulting impacts of GHG-emissions as
            possible. Having set such a target would still mean that there would
            be flexibility in terms of emissions pathways for the different GHGs
            in aligning with that target, but they would still lead to the same
            temperature increase in contrast to only using point year targets.
            Exploring different pathways for the same temperature target could
            result in a more efficient suite of mitigation actions being
            deployed.
          </p>
          <p>
            If a common standard for setting such targets were defined,
            uncertainties in how to model country or actor contributions would
            be narrowed down and become more transparent and comparable. If the
            actual targeted pathways also were disclosed, as a complement to the
            temperature targets, this would further increase transparency and
            the possibility to calculate the total impact of multiple actors´
            targets using even the full suite of climate models.
          </p>
          <p>
            Do note that the temperature calculated in the explorer is aimed at
            aiding target setting, not at exploring the impacts of emission, via
            temperature increase, on ecosystems etc. To take that further step,
            a more complex modelling process needs to carried out e.g. in line
            with what the IPCC is doing. Many e.g. cities or organisations do
            however not need to go there. Theoretically this is related to the
            concept of incommensurability – even though simple models and
            complex models report result in temperature it does not mean they
            are exactly comparable and can be used for the same purpose.
          </p>
          <p>
            It would be interesting to explore if it would be possible to divide
            the Paris agreements temperature targets to the local level in a
            similar fashion to the carbon budgets approach, taking equity and
            fairness into account as enshrined in the Paris Agreement. This
            analogy is what would be chosen, if, at this point, a suggestion
            would be made for setting Paris compliant targets in relation to the
            explorer’s framework. According to recent research(3), CO2 emissions
            need to decrease by more than 10 % p.a. (exponential decrease) for
            industrialized countries starting January 2020. This could then be
            translated into, similarly, a more than 10 % p.a. decrease in
            temperature additions as well, with reference to the temperature
            increase caused by GHG emission in the year 2019 (or over a period
            of baseline year, e.g. grandfathering). This would also hold for
            companies e.g. per economic unit or other metric. This is the method
            used currently in the tool when scenarios are used.
          </p>
          <p>
            Another way of describing what this explorer does is to show what
            terms like net-zero, zero-carbon etc. mean on a temperature scale
            (cumulative for CO2) including a multi-GHG perspective. It will show
            that it is possible to reach zero temperature increase, without the
            use of negative emission, if only CO2 emission go to zero (zero
            carbon) and other GHGs remain at constant emission levels. Depending
            on the emission pathway before the baseline year and the lifetime of
            the gas, this stabilisation will take different amount of time
            (different models will compute this differently, so it may not be
            shown that way).
          </p>
          <p>
            Initially this explorer works with a model that calculates
            temperature increase by classifying GHGs as either being long-lived
            climate pollutants (LLCPs) or short-lived climate pollutants
            (SLCPs). This is a good approximation for some scenarios but in this
            particular implementation does not capture the full dynamics of e.g.
            the decay of nitrous oxide, leading to slight deviations on longer
            timescales from more complex models.
          </p>
          <p>
            The effect of including negative carbon emissions can also be
            evaluated in terms of total temperature effect.
          </p>

          <Box my={2}>
            <Divider />
          </Box>

          <p>
            Source code: <br />
            The source code to the tool is freely available under a license yet
            to be decided. Please contact us for a copy.
          </p>

          <p>
            Authors and Contact: <br />
            This explorer was developed by Martin Wetterstedt (concept, science
            interpretation and texts) and Anders Gustafsson (programming and
            user interface), Climate Change Leadership node, Uppsala university.
          </p>
          <p>
            Acknowledgements: <br />
            The site heavily relies on the respective models used to calculate
            temperature impact or radiative forcing from GHG emissions time
            series. Please refer to each model for more information. Many thanks
            to Isak Stoddard, Uppsala University, for reviewing and commenting
            on the texts.
          </p>
          <p>
            References:
            <br />
            1.{" "}
            <Link to="https://www.carbonbrief.org/guest-post-a-brief-history-of-climate-targets-and-technological-promises">
              McLaren, Duncan. 2020. A brief history of climate targets and
              technological promises. CarbonBrief.
            </Link>
            <br />
            2.{" "}
            <Link to="https://journals.sagepub.com/doi/full/10.1177/0306312720941933">
              Lahn, Bård. 2020. Changing climate change: The carbon budget and
              the modifying-work of the IPCC. Social Studies of Science.
            </Link>
            <br />
            3.{" "}
            <Link to="https://doi.org/10.1080/14693062.2020.1728209">
              Anderson, Kevin; Broderick, John F.; Stoddard, Isak. A factor of
              two: how the mitigation plans of ‘climate progressive’ nations
              fall far short of Paris-compliant pathways.
            </Link>
            <br />
          </p>
        </Typography>
      </Container>
    </>
  );
}

/*
See <Link to="https://www.google.se">[some article]</Link> for details
          about the used model.
          */
