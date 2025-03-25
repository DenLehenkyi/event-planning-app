import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { Event } from "../types/types";

export const saveUserToFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
      });
      console.log("Користувача успішно збережено у Firestore:", user.uid);
    } else {
      console.log("Користувач уже існує у Firestore:", user.uid);
    }
  } catch (error) {
    console.error("Помилка при збереженні користувача у Firestore:", error);
    throw error;
  }
};

export const addEventToFirestore = async (
  userId: string,
  event: Omit<Event, "id">
) => {
  try {
    const eventRef = doc(collection(db, `users/${userId}/events`));
    await setDoc(eventRef, {
      ...event,
      id: eventRef.id,
    });
    return { ...event, id: eventRef.id };
  } catch (error) {
    console.error("Помилка при додаванні події у Firestore:", error);
    throw error;
  }
};

export const getEventsFromFirestore = async (
  userId: string
): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, `users/${userId}/events`);
    const eventsSnap = await getDocs(eventsRef);
    return eventsSnap.docs.map((doc) => doc.data() as Event);
  } catch (error) {
    console.error("Помилка при отриманні подій з Firestore:", error);
    throw error;
  }
};

export const updateEventInFirestore = async (userId: string, event: Event) => {
  try {
    const eventRef = doc(db, `users/${userId}/events`, event.id);
    await updateDoc(eventRef, { ...event });
  } catch (error) {
    console.error("Помилка при оновленні події у Firestore:", error);
    throw error;
  }
};

export const deleteEventFromFirestore = async (
  userId: string,
  eventId: string
) => {
  try {
    const eventRef = doc(db, `users/${userId}/events`, eventId);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error("Помилка при видаленні події з Firestore:", error);
    throw error;
  }
};
