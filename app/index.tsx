import {Image, StyleSheet, Platform, View, Text, Pressable} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState} from "react";
import AllPages from "@/components/AllPages";

export default function HomeScreen() {
    return (
        <AllPages/>
  );
}


