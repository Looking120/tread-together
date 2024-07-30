import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SubscriberNotifications from '../SubscriberNotifications';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppTrafficBySite from '../app-traffic-by-site';
import AppWidgetSummary from '../app-widget-summary';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Ventes Hebdomadaires"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Nouveaux Utilisateurs"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Commandes d'Articles"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Reclamaions "
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Mises à jour des nouvelles"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Historique des Commandes"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, commandes, 4220$',
                '12 factures ont été payées',
                'Commande #37745 de septembre',
                'Nouvelle commande passée #XF-2356',
                'Nouvelle commande passée #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Trafic par Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <SubscriberNotifications
            title="Notifications des abonnés"
            subheader="Acceptez ou refusez les notifications"
            list={[
              { id: '1', title: 'Nouveau Abonné', message: 'John Doe a suivi votre page.' },
              { id: '2', title: 'Commentaire', message: 'Jane Smith a commenté votre post.' },
              { id: '3', title: 'Mention', message: 'Bob Lee vous a mentionné dans un commentaire.' },
              { id: '4', title: 'Partage', message: 'Alice Johnson a partagé votre post.' },
              { id: '5', title: 'Message', message: 'Charlie Brown vous a envoyé un message.' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
