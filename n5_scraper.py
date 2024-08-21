import pandas as pd
import json

# 加载Excel文件
df = pd.read_excel(r"C:\Users\cdpss\OneDrive - 國立台灣大學\文件\暑期練習\N5日文單字表.xlsx")

# 准备存储题目数据的列表
quiz_data = []

# 遍历数据框中的每一行
for index, row in df.iterrows():
    # 获取单词和正确的中文翻译
    word = row['日文']
    correct_answer = row['中文']
    
    # 从DataFrame中随机选择另外三个错误答案
    other_options = df[df['中文'] != correct_answer].sample(3)['中文'].tolist()
    
    # 将正确答案加入到选项中
    options = other_options + [correct_answer]
    
    # 随机打乱选项顺序
    quiz_item = {
        "word": word,
        "correct": correct_answer,
        "options": options
    }
    
    quiz_data.append(quiz_item)

# 将quiz_data转化为JavaScript代码
js_code = "const quizData = " + json.dumps(quiz_data, ensure_ascii=False, indent=4) + ";"

# 将生成的JavaScript代码保存到文件中
with open('quizData.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("JavaScript quizData 代码已生成并保存为 quizData.js")