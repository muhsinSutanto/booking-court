import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { BookingSessionProvider } from '@/context/BookingSession'
import { CoachingSessionProvider } from '@/context/CoachingSession'
import { JoinSessionProvider } from '@/context/JoinSession'
import { BookConfirmPage } from '@/pages/book-confirm/BookConfirmPage'
import { BookPaymentPage } from '@/pages/book-payment/BookPaymentPage'
import { BookSuccessPage } from '@/pages/book-success/BookSuccessPage'
import { CourtDetailPage } from '@/pages/court/CourtDetailPage'
import { JoinConfirmPage } from '@/pages/join-confirm/JoinConfirmPage'
import { JoinPaymentPage } from '@/pages/join-payment/JoinPaymentPage'
import { JoinSuccessPage } from '@/pages/join-success/JoinSuccessPage'
import { HomePage } from '@/pages/home/HomePage'
import { MatchDetailPage } from '@/pages/match/MatchDetailPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { SchedulePage } from '@/pages/schedule/SchedulePage'
import { CoachingDetailPage } from '@/pages/coaching/CoachingDetailPage'
import { CoachingPaymentPage } from '@/pages/coaching-payment/CoachingPaymentPage'
import { CoachingSuccessPage } from '@/pages/coaching-success/CoachingSuccessPage'
import { LearnPage } from '@/pages/learn/LearnPage'

export default function App() {
  return (
    <BrowserRouter>
      <JoinSessionProvider>
        <BookingSessionProvider>
          <CoachingSessionProvider>
            <Routes>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="learn" element={<LearnPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="learn/:sessionId" element={<CoachingDetailPage />} />
            <Route path="learn/:sessionId/pay" element={<CoachingPaymentPage />} />
            <Route path="learn/:sessionId/joined" element={<CoachingSuccessPage />} />
            <Route path="match/:matchId" element={<MatchDetailPage />} />
            <Route path="match/:matchId/confirm" element={<JoinConfirmPage />} />
            <Route path="match/:matchId/pay" element={<JoinPaymentPage />} />
            <Route path="match/:matchId/joined" element={<JoinSuccessPage />} />
            <Route path="court/:courtId" element={<CourtDetailPage />} />
            <Route path="court/:courtId/book/:slotId" element={<BookConfirmPage />} />
            <Route path="court/:courtId/book/:slotId/pay" element={<BookPaymentPage />} />
            <Route path="court/:courtId/book/:slotId/booked" element={<BookSuccessPage />} />
            </Routes>
          </CoachingSessionProvider>
        </BookingSessionProvider>
      </JoinSessionProvider>
    </BrowserRouter>
  )
}
