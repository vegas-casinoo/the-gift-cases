insert into cases (name, image_url, price_ton, popularity, sort)
values
('Daily',  '/assets/cases/daily.png',   0.25, 100, 1),
('Broke',  '/assets/cases/broke.png',   0.39, 90,  2),
('Starter','/assets/cases/starter.png', 0.77, 70,  3),
('Risk',   '/assets/cases/risk.png',    1.00, 50,  4)
on conflict do nothing;

-- Пример предметов (weights)
insert into case_items (case_id, title, rarity, weight, reward_type, reward_value)
select c.id, x.title, x.rarity, x.weight, 'gift', x.reward
from cases c
join (values
  ('Daily','Gift: Rose', 'common', 70, 'rose'),
  ('Daily','Gift: Duck', 'rare',   25, 'duck'),
  ('Daily','Gift: Crown','epic',    5, 'crown')
) as x(case_name, title, rarity, weight, reward)
on c.name = x.case_name;