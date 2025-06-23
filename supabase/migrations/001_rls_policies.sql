-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE needs_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Needs assessments policies
CREATE POLICY "Users can view own assessments" ON needs_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" ON needs_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments" ON needs_assessments
  FOR UPDATE USING (auth.uid() = user_id);

-- Mood entries policies
CREATE POLICY "Users can view own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);