// import { YStack, H4, Paragraph, Button, Card, Text, useTheme, styled } from 'tamagui';
// import { useSpring, animated } from 'react-spring';

// // Exemplo de dados fictícios
// const stats = {
//   totalMembers: 1200,
//   activeClasses: 15,
//   trainers: 10,
//   upcomingEvents: 5,
// };

// // Componente estilizado para os cards de estatísticas
// const StatCard = styled(YStack, {
//   backgroundColor: '$backgroundLight',
//   borderRadius: '$4',
//   padding: '$4',
//   shadowColor: '$shadow',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.2,
//   shadowRadius: 4,
//   elevation: 2,
// });

// export const AdminDashboard = () => {
//   // Animações para os cards de estatísticas
//   const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 800 } });

//   return (
//     <YStack padding="$4" space="$4">
//       <H4>EliteGym - Dashboard</H4>

//       <YStack space="$4">
//         <animated.div style={props}>
//           <YStack space="$4" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
//             <StatCard>
//               <H4>Total Members</H4>
//               <Text fontSize="$5" fontWeight="bold">{stats.totalMembers}</Text>
//             </StatCard>
            
//             <StatCard>
//               <H4>Active Classes</H4>
//               <Text fontSize="$5" fontWeight="bold">{stats.activeClasses}</Text>
//             </StatCard>
            
//             <StatCard>
//               <H4>Trainers</H4>
//               <Text fontSize="$5" fontWeight="bold">{stats.trainers}</Text>
//             </StatCard>
            
//             <StatCard>
//               <H4>Upcoming Events</H4>
//               <Text fontSize="$5" fontWeight="bold">{stats.upcomingEvents}</Text>
//             </StatCard>
//           </YStack>
//         </animated.div>

//         <YStack space="$4">
//           <Card padding="$4" backgroundColor="$backgroundLight">
//             <H4>Recent Activity</H4>
//             <Paragraph>
//               View the latest activities and updates from the gym. Stay informed about member activities, new class schedules, and more.
//             </Paragraph>
//             <Button backgroundColor="$primary" color="$white">View Details</Button>
//           </Card>

//           <Card padding="$4" backgroundColor="$backgroundLight">
//             <H4>Announcements</H4>
//             <Paragraph>
//               Check out the latest announcements and updates from the gym management. Important information about changes in schedule or policies will be posted here.
//             </Paragraph>
//             <Button backgroundColor="$primary" color="$white">Read More</Button>
//           </Card>
//         </YStack>
//       </YStack>
//     </YStack>
//   );
// };
