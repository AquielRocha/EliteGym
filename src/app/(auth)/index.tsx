import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Usando FontAwesome5
import { Button, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Bem-vindo ao Elite Gym!',
    description: 'O Elite Gym é o aplicativo ideal para você que busca resultados reais na academia. Com recursos personalizados e acompanhamento contínuo, você estará sempre no caminho certo para alcançar seus objetivos.',
    icon: 'heartbeat',
  },
  {
    title: 'Treinos Personalizados',
    description: 'Acompanhe planos de treino feitos sob medida para suas necessidades e objetivos. Seja para emagrecimento, hipertrofia ou condicionamento físico, o Elite Gym tem o treino certo para você.',
    icon: 'dumbbell',
  },
  {
    title: 'Suporte e Comunidade',
    description: 'Receba suporte de especialistas e conecte-se com outros membros da comunidade. Participe de desafios, compartilhe suas conquistas e fique motivado.',
    icon: 'users',
  },
];

const IntroductionScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation] = useState(new Animated.Value(1)); // Inicializa a animação
  const router = useRouter();

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      router.push('/LandingPage'); // Navega para a tela home
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <YStack flex={1} padding={16} backgroundColor="#f4f4f4">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={slide.icon} size={60} color="#fff" style={styles.icon} />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
            {index === slides.length - 1 && (
              <Animated.View
                style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.push('/LandingPage'); 
                  }}
                  onPressIn={animateButton} 
                >
                  <Text style={styles.buttonText}>Clique Aqui</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <FontAwesome5 name="arrow-right" size={30} color="#007bff" />
        </TouchableOpacity>
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  iconContainer: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
