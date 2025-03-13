from openai import OpenAI

client = OpenAI(
  api_key=""
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "what color is the sky?"},
  ]
)

print(completion.choices[0].message)
