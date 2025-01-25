import {Image, StyleSheet, Platform, View, Text, Pressable} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState} from "react";
import HomePage from "@/components/HomePage";

export default function HomeScreen() {
    return (
    <HomePage></HomePage>
  );
}


