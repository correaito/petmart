import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface Service {
  id: string;
  name: string;
  image: string | number;
  price: number;
  duration: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const availableServices: Service[] = [
  {
    id: '1',
    name: 'Banho e Tosa',
    image: require('../../assets/images/service1.png'),
    price: 80.0,
    duration: '1h 30min',
  },
  {
    id: '2',
    name: 'Consulta Veterinária',
    image: require('../../assets/images/service2.png'),
    price: 150.0,
    duration: '45min',
  },
  {
    id: '3',
    name: 'Vacinação',
    image: require('../../assets/images/service3.png'),
    price: 120.0,
    duration: '30min',
  },
  {
    id: '4',
    name: 'Adestramento',
    image: require('../../assets/images/service4.png'),
    price: 200.0,
    duration: '1h',
  },
];

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: false },
  { time: '17:00', available: true },
];

interface SchedulingScreenProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  preSelectedService?: any;
}

export const SchedulingScreen: React.FC<SchedulingScreenProps> = ({ onNavigate, onBack, preSelectedService }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  // States para armazenar as posições Y reais de cada seção
  const [timeSlotsY, setTimeSlotsY] = useState<number>(0);
  const [additionalInfoY, setAdditionalInfoY] = useState<number>(0);
  const [summaryY, setSummaryY] = useState<number>(0);

  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-select service when preSelectedService is provided
  React.useEffect(() => {
    if (preSelectedService) {
      // Find matching service by ID
      const matchingService = availableServices.find(
        service => service.id === preSelectedService.id
      );
      if (matchingService) {
        setSelectedService(matchingService);
        // Scroll to show calendar after service is selected
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 200,
            animated: true
          });
        }, 300);
      }
    }
  }, [preSelectedService]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmScheduling = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Atenção', 'Por favor, selecione um serviço, data e horário.');
      return;
    }

    Alert.alert(
      'Confirmar Agendamento',
      `Confirma o agendamento para ${selectedService.name} em ${formatDate(selectedDate)} às ${selectedTime}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert('Sucesso!', 'Agendamento confirmado com sucesso!', [
              {
                text: 'OK',
                onPress: () => {
                  // Reset form and go back to services
                  setSelectedService(null);
                  setSelectedDate('');
                  setSelectedTime('');
                  setAdditionalInfo('');
                  onBack?.();
                }
              }
            ]);
          }
        },
      ]
    );
  };

  // Auto-scroll when date is selected (for time slots)
  React.useEffect(() => {
    if (selectedDate && scrollViewRef.current) {
      // Scroll para mostrar horários quando data é selecionada
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 450,
          animated: true
        });
      }, 300); // Timeout menor agora que é mais confiável
    }
  }, [selectedDate]);

  // Auto-scroll when time is selected (for additional info)
  React.useEffect(() => {
    if (selectedTime && scrollViewRef.current) {
      // Scroll para mostrar informações adicionais quando horário é selecionado
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 750,
          animated: true
        });
      }, 300);
    }
  }, [selectedTime]);

  // Auto-scroll to summary when it appears
  React.useEffect(() => {
    if (selectedService && selectedDate && selectedTime && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 950,
          animated: true
        });
      }, 300);
    }
  }, [selectedService, selectedDate, selectedTime]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceCard,
        selectedService?.id === service.id && styles.serviceCardSelected
      ]}
      onPress={() => handleServiceSelect(service)}
      activeOpacity={0.7}
    >
      <Image 
        source={typeof service.image === 'string' ? { uri: service.image } : service.image} 
        style={styles.serviceImage} 
      />
      <Text style={styles.serviceName}>{service.name}</Text>
    </TouchableOpacity>
  );

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonthIndex = today.getMonth();
    const currentYearValue = today.getFullYear();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate && currentMonth === currentMonthIndex && currentYear === currentYearValue;
      const isSelected = selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = currentYear < currentYearValue ||
                    (currentYear === currentYearValue && currentMonth < currentMonthIndex) ||
                    (currentYear === currentYearValue && currentMonth === currentMonthIndex && day < currentDate);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isToday && styles.calendarDayToday,
            isSelected && styles.calendarDaySelected,
            isPast && styles.calendarDayDisabled
          ]}
          onPress={() => !isPast && handleDateSelect(day)}
          disabled={isPast}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.calendarDayText,
            isToday && styles.calendarDayTextToday,
            isSelected && styles.calendarDayTextSelected,
            isPast && styles.calendarDayTextDisabled
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const renderTimeSlot = (slot: TimeSlot) => (
    <TouchableOpacity
      key={slot.time}
      style={[
        styles.timeSlot,
        selectedTime === slot.time && styles.timeSlotSelected,
        !slot.available && styles.timeSlotDisabled
      ]}
      onPress={() => slot.available && handleTimeSelect(slot.time)}
      disabled={!slot.available}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.timeSlotText,
        selectedTime === slot.time && styles.timeSlotTextSelected,
        !slot.available && styles.timeSlotTextDisabled
      ]}>
        {slot.time}
      </Text>
    </TouchableOpacity>
  );

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.5}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Serviço</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qual serviço você deseja?</Text>
          <View style={styles.servicesGrid}>
            {availableServices.map(renderServiceCard)}
          </View>
        </View>

        {/* Date Selection */}
        {selectedService && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quando?</Text>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity
                  style={styles.calendarNavButton}
                  onPress={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chevron-back" size={20} color={colors.text.primary} />
                </TouchableOpacity>

                <Text style={styles.calendarTitle}>
                  {new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>

                <TouchableOpacity
                  style={styles.calendarNavButton}
                  onPress={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chevron-forward" size={20} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.calendarWeekDays}>
                {weekDays.map((day, index) => (
                  <Text key={index} style={styles.calendarWeekDay}>{day}</Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {renderCalendar()}
              </View>
            </View>
          </View>
        )}

        {/* Time Selection */}
        {selectedDate && (
          <View
            style={styles.section}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setTimeSlotsY(y);
            }}
          >
            <Text style={styles.sectionTitle}>Horários disponíveis</Text>
            <View style={styles.timeSlotsContainer}>
              {timeSlots.map(renderTimeSlot)}
            </View>
          </View>
        )}


        {/* Additional Information */}
        {selectedTime && (
          <View 
            style={styles.section}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setAdditionalInfoY(y);
            }}
          >
            <Text style={styles.sectionTitle}>Algo mais que precisamos saber?</Text>
            <TextInput
              style={styles.additionalInfoInput}
              placeholder="Ex: Meu cachorro tem alergia a..."
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        )}

        {/* Scheduling Summary */}
        {selectedService && selectedDate && selectedTime && (
          <View 
            style={styles.section}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSummaryY(y);
            }}
          >
            <Text style={styles.sectionTitle}>Resumo do Agendamento</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Serviço:</Text>
                <Text style={styles.summaryValue}>{selectedService.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Data:</Text>
                <Text style={styles.summaryValue}>{formatDate(selectedDate)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Horário:</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Custo Total:</Text>
                <Text style={styles.totalValue}>R$ {selectedService.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      {selectedService && selectedDate && selectedTime && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.8}
            onPress={handleConfirmScheduling}
          >
            <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.md,
    marginLeft: -spacing.xs,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
    marginLeft: -spacing.lg,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    padding: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    aspectRatio: 1.2,
    justifyContent: 'center',
  },
  serviceCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: spacing.sm,
    resizeMode: 'cover',
  },
  serviceName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  calendarNavButton: {
    padding: spacing.xs,
  },
  calendarTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  calendarWeekDays: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  calendarWeekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  calendarDayTextToday: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  calendarDayTextSelected: {
    color: colors.text.light,
    fontWeight: typography.fontWeight.bold,
  },
  calendarDayTextDisabled: {
    color: colors.text.secondary,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  timeSlot: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    margin: spacing.xs,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotDisabled: {
    opacity: 0.4,
  },
  timeSlotText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  timeSlotTextSelected: {
    color: colors.text.light,
    fontWeight: typography.fontWeight.bold,
  },
  timeSlotTextDisabled: {
    color: colors.text.secondary,
  },
  additionalInfoInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    backgroundColor: colors.background,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  totalLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  confirmButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
